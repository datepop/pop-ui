/**
 * Naver Maps Marker Clustering utility
 * Creates clustered markers when multiple markers are close together
 *
 * This is adapted from Naver's official marker clustering library.
 * Some legacy patterns are preserved for compatibility.
 */

/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */

interface IMarkerClustering {
  DEFAULT_OPTIONS: {
    map: any;
    markers: any[];
    disableClickZoom: boolean;
    minClusterSize: number;
    maxZoom: number;
    gridSize: number;
    icons: any[];
    indexGenerator: number[] | ((count: number) => number);
    averageCenter: boolean;
    stylingFunction: (clusterMarker: any, count: number) => void;
  };
  _clusters: any[];
  _mapRelations: any;
  _markerRelations: any[];
  setOptions(options: any, isFirst?: boolean): void;
  setMap(map: any): void;
}

interface ICluster {
  _clusterCenter: any;
  _clusterBounds: any;
  _clusterMarker: any;
  _relation: any;
  _clusterMember: any[];
  _markerClusters: any;
}

export function makeMarkerClustering(naver: any): any {
  const MarkerClustering: any = function (this: IMarkerClustering, options: any): void {
    this.DEFAULT_OPTIONS = {
      map: null,
      markers: [],
      disableClickZoom: true,
      minClusterSize: 2,
      maxZoom: 13,
      gridSize: 100,
      icons: [],
      indexGenerator: [10, 100, 200, 500, 1000],
      averageCenter: false,
      stylingFunction: function () {},
    };

    this._clusters = [];
    this._mapRelations = null;
    this._markerRelations = [];

    this.setOptions(naver.maps.Util.extend({}, this.DEFAULT_OPTIONS, options), true);
    this.setMap(options.map || null);
  };

  naver.maps.Util.ClassExtend(MarkerClustering, naver.maps.OverlayView, {
    onAdd: function (): void {
      const map = this.getMap();

      this._mapRelations = naver.maps.Event.addListener(
        map,
        'idle',
        naver.maps.Util.bind(this._onIdle, this),
      );

      if (this.getMarkers().length > 0) {
        this._createClusters();
        this._updateClusters();
      }
    },

    draw: naver.maps.Util.noop,

    onRemove: function (): void {
      naver.maps.Event.removeListener(this._mapRelation);
      this._clearClusters();

      this._geoTree = null;
      this._mapRelation = null;
    },

    setOptions: function (newOptions: any): void {
      const _this = this;

      if (typeof newOptions === 'string') {
        const key = newOptions;
        const value = arguments[1];
        _this.set(key, value);
      } else {
        const isFirst = arguments[1];

        naver.maps.Util.forEach(newOptions, function (value: any, key: any) {
          if (key !== 'map') {
            _this.set(key, value);
          }
        });

        if (newOptions.map && !isFirst) {
          _this.setMap(newOptions.map);
        }
      }
    },

    getOptions: function (key?: string): any {
      const _this = this;
      const options: any = {};

      if (key !== undefined) {
        return _this.get(key);
      } else {
        naver.maps.Util.forEach(_this.DEFAULT_OPTIONS, function (_value: any, k: string) {
          options[k] = _this.get(k);
        });

        return options;
      }
    },

    getMinClusterSize: function (): number {
      return this.getOptions('minClusterSize');
    },

    setMinClusterSize: function (size: number): void {
      this.setOptions('minClusterSize', size);
    },

    getMaxZoom: function (): number {
      return this.getOptions('maxZoom');
    },

    setMaxZoom: function (zoom: number): void {
      this.setOptions('maxZoom', zoom);
    },

    getGridSize: function (): number {
      return this.getOptions('gridSize');
    },

    setGridSize: function (size: number): void {
      this.setOptions('gridSize', size);
    },

    getIndexGenerator: function (): any {
      return this.getOptions('indexGenerator');
    },

    setIndexGenerator: function (indexGenerator: any): void {
      this.setOptions('indexGenerator', indexGenerator);
    },

    getMarkers: function (): any[] {
      return this.getOptions('markers');
    },

    setMarkers: function (markers: any[]): void {
      this.setOptions('markers', markers);
    },

    getIcons: function (): any[] {
      return this.getOptions('icons');
    },

    setIcons: function (icons: any[]): void {
      this.setOptions('icons', icons);
    },

    getStylingFunction: function (): (clusterMarker: any, count: number) => void {
      return this.getOptions('stylingFunction');
    },

    setStylingFunction: function (func: (clusterMarker: any, count: number) => void): void {
      this.setOptions('stylingFunction', func);
    },

    getDisableClickZoom: function (): boolean {
      return this.getOptions('disableClickZoom');
    },

    setDisableClickZoom: function (flag: boolean): void {
      this.setOptions('disableClickZoom', flag);
    },

    getAverageCenter: function (): boolean {
      return this.getOptions('averageCenter');
    },

    setAverageCenter: function (averageCenter: boolean): void {
      this.setOptions('averageCenter', averageCenter);
    },

    changed: function (key: string, value: any): void {
      if (!this.getMap()) return;

      switch (key) {
        case 'marker':
        case 'minClusterSize':
        case 'gridSize':
        case 'averageCenter':
          this._redraw();
          break;
        case 'indexGenerator':
        case 'icons':
          this._clusters.forEach(function (cluster: any) {
            cluster.updateIcon();
          });
          break;
        case 'maxZoom':
          this._clusters.forEach(function (cluster: any) {
            if (cluster.getCount() > 1) {
              cluster.checkByZoomAndMinClusterSize();
            }
          });
          break;
        case 'stylingFunction':
          this._clusters.forEach(function (cluster: any) {
            cluster.updateCount();
          });
          break;
        case 'disableClickZoom':
          let exec = 'enableClickZoom';
          if (value) {
            exec = 'disableClickZoom';
          }
          this._clusters.forEach(function (cluster: any) {
            cluster[exec]();
          });
          break;
      }
    },

    _createClusters: function (): void {
      const map = this.getMap();
      if (!map) return;

      const bounds = map.getBounds();
      const markers = this.getMarkers();

      for (let i = 0, ii = markers.length; i < ii; i++) {
        const marker = markers[i];
        const position = marker.getPosition();

        if (!bounds.hasLatLng(position)) continue;

        const closestCluster = this._getClosestCluster(position);
        closestCluster.addMarker(marker);

        this._markerRelations.push(
          naver.maps.Event.addListener(
            marker,
            'dragend',
            naver.maps.Util.bind(this._onDragEnd, this),
          ),
        );
      }
    },

    _updateClusters: function (): void {
      const clusters = this._clusters;

      for (let i = 0, ii = clusters.length; i < ii; i++) {
        clusters[i].updateCluster();
      }
    },

    _clearClusters: function (): void {
      const clusters = this._clusters;

      for (let i = 0, ii = clusters.length; i < ii; i++) {
        clusters[i].destroy();
      }

      naver.maps.Event.removeListener(this._markerRelations);
      this._markerRelations = [];
      this._clusters = [];
    },

    _redraw: function (): void {
      this._clearClusters();
      this._createClusters();
      this._updateClusters();
    },

    _getClosestCluster: function (position: any): any {
      const proj = this.getProjection();
      const clusters = this._clusters;
      let closestCluster: any = null;
      let distance = Infinity;

      for (let i = 0, ii = clusters.length; i < ii; i++) {
        const cluster = clusters[i];
        const center = cluster.getCenter();

        if (cluster.isInBounds(position)) {
          const delta = proj.getDistance(center, position);
          if (delta < distance) {
            distance = delta;
            closestCluster = cluster;
          }
        }
      }

      if (!closestCluster) {
        closestCluster = new Cluster(this);
        this._clusters.push(closestCluster);
      }

      return closestCluster;
    },

    _onIdle: function (): void {
      this._redraw();
    },

    _onDragEnd: function (): void {
      this._redraw();
    },
  });

  const Cluster: any = function (this: ICluster, markerClusters: any): void {
    this._clusterCenter = null;
    this._clusterBounds = null;
    this._clusterMarker = null;
    this._relation = null;

    this._clusterMember = [];

    this._markerClusters = markerClusters;
  };

  Cluster.prototype = {
    constructor: Cluster,

    addMarker: function (marker: any): void {
      if (this._isMember(marker)) return;

      if (!this._clusterCenter) {
        const position = marker.getPosition();
        this._clusterCenter = position;
        this._clusterBounds = this._calcBounds(position);
      }

      this._clusterMember.push(marker);
    },

    destroy: function (): void {
      naver.maps.Event.removeListener(this._relation);

      const members = this._clusterMember;
      for (let i = 0, ii = members.length; i < ii; i++) {
        members[i].setMap(null);
      }

      this._clusterMarker.setMap(null);

      this._clusterMarker = null;
      this._clusterCenter = null;
      this._clusterBounds = null;
      this._relation = null;
      this._clusterMember = [];
    },

    getCenter: function (): any {
      return this._clusterCenter;
    },

    getBounds: function (): any {
      return this._clusterBounds;
    },

    getCount: function (): number {
      return this._clusterMember.length;
    },

    getClusterMember: function (): any[] {
      return this._clusterMember;
    },

    isInBounds: function (latlng: any): boolean {
      return this._clusterBounds && this._clusterBounds.hasLatLng(latlng);
    },

    enableClickZoom: function (): void {
      if (this._relation) return;

      const map = this._markerClusters.getMap();
      this._relation = naver.maps.Event.addListener(
        this._clusterMarker,
        'click',
        naver.maps.Util.bind(function (e: any) {
          map.morph(e.coord, map.getZoom() + 1);
        }, this),
      );
    },

    disableClickZoom: function (): void {
      if (!this._relation) return;

      naver.maps.Event.removeListener(this._relation);
      this._relation = null;
    },

    updateCluster: function (): void {
      if (!this._clusterMarker) {
        let position;
        if (this._markerClusters.getAverageCenter()) {
          position = this._calcAverageCenter(this._clusterMember);
        } else {
          position = this._clusterCenter;
        }

        this._clusterMarker = new naver.maps.Marker({
          position: position,
          map: this._markerClusters.getMap(),
        });

        if (!this._markerClusters.getDisableClickZoom()) {
          this.enableClickZoom();
        }
      }

      this.updateIcon();
      this.updateCount();
      this.checkByZoomAndMinClusterSize();
    },

    checkByZoomAndMinClusterSize: function (): void {
      const clusters = this._markerClusters;
      const minClusterSize = clusters.getMinClusterSize();
      const maxZoom = clusters.getMaxZoom();
      const currentZoom = clusters.getMap().getZoom();

      if (this.getCount() < minClusterSize) {
        this._showMember();
      } else {
        this._hideMember();
        if (maxZoom <= currentZoom) {
          this._showMember();
        }
      }
    },

    updateCount: function (): void {
      const stylingFunction = this._markerClusters.getStylingFunction();
      if (stylingFunction) {
        stylingFunction(this._clusterMarker, this.getCount());
      }
    },

    updateIcon: function (): void {
      const count = this.getCount();
      let index = this._getIndex(count);
      const icons = this._markerClusters.getIcons();

      index = Math.max(index, 0);
      index = Math.min(index, icons.length - 1);

      this._clusterMarker.setIcon(icons[index]);
    },

    _showMember: function (): void {
      const map = this._markerClusters.getMap();
      const marker = this._clusterMarker;
      const members = this._clusterMember;

      for (let i = 0, ii = members.length; i < ii; i++) {
        members[i].setMap(map);
      }

      if (marker) {
        marker.setMap(null);
      }
    },

    _hideMember: function (): void {
      const map = this._markerClusters.getMap();
      const marker = this._clusterMarker;
      const members = this._clusterMember;

      for (let i = 0, ii = members.length; i < ii; i++) {
        members[i].setMap(null);
      }

      if (marker && !marker.getMap()) {
        marker.setMap(map);
      }
    },

    _calcBounds: function (position: any): any {
      const map = this._markerClusters.getMap();
      const bounds = new naver.maps.LatLngBounds(position.clone(), position.clone());
      const mapBounds = map.getBounds();
      const proj = map.getProjection();
      const map_max_px = proj.fromCoordToOffset(mapBounds.getNE());
      const map_min_px = proj.fromCoordToOffset(mapBounds.getSW());
      const max_px = proj.fromCoordToOffset(bounds.getNE());
      const min_px = proj.fromCoordToOffset(bounds.getSW());
      const gridSize = this._markerClusters.getGridSize() / 2;

      max_px.add(gridSize, -gridSize);
      min_px.add(-gridSize, gridSize);

      const max_px_x = Math.min(map_max_px.x, max_px.x);
      const max_px_y = Math.max(map_max_px.y, max_px.y);
      const min_px_x = Math.max(map_min_px.x, min_px.x);
      const min_px_y = Math.min(map_min_px.y, min_px.y);
      const newMax = proj.fromOffsetToCoord(new naver.maps.Point(max_px_x, max_px_y));
      const newMin = proj.fromOffsetToCoord(new naver.maps.Point(min_px_x, min_px_y));

      return new naver.maps.LatLngBounds(newMin, newMax);
    },

    _getIndex: function (count: number): number {
      const indexGenerator = this._markerClusters.getIndexGenerator();

      if (naver.maps.Util.isFunction(indexGenerator)) {
        return indexGenerator(count);
      } else if (naver.maps.Util.isArray(indexGenerator)) {
        let index = 0;
        for (let i = 0, ii = indexGenerator.length; i < ii; i++) {
          const factor = indexGenerator[i];
          if (count < factor) break;
          index++;
        }
        return index;
      }
      return 0;
    },

    _isMember: function (marker: any): boolean {
      return this._clusterMember.indexOf(marker) !== -1;
    },

    _calcAverageCenter: function (markers: any[]): any {
      const numberOfMarkers = markers.length;
      const averageCenter = [0, 0];

      for (let i = 0; i < numberOfMarkers; i++) {
        averageCenter[0] += markers[i].position.x;
        averageCenter[1] += markers[i].position.y;
      }

      averageCenter[0] /= numberOfMarkers;
      averageCenter[1] /= numberOfMarkers;

      return new naver.maps.Point(averageCenter[0], averageCenter[1]);
    },
  };

  return MarkerClustering;
}
