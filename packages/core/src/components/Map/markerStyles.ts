/**
 * Marker HTML and CSS styles for Naver Maps
 * These styles are applied via CSS classes in the marker HTML
 */

import type { IPiMarkerData, TMarkerData } from './types';

// Pin Marker HTML
const getPinMarkerHTML = (data: Extract<TMarkerData, { type: 'pin' }>): string => {
  const { name, icon } = data;
  const iconHTML = icon
    ? `<img src="${icon}" alt="${name}" width="40" height="40" />`
    : `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M18.7686 1.26235C11.6407 0.936128 5.75293 6.62941 5.75293 13.6913C5.75293 22.565 11.76 30.0415 15.1594 33.4869C16.8117 35.1766 19.5261 35.1761 21.1779 33.4854C24.318 30.2845 29.8102 23.653 30.5636 15.5539L30.5637 15.5531C31.2237 8.38935 26.1199 1.59187 18.7686 1.26235ZM18.7686 1.26235L18.7229 2.26131L18.7676 1.2623C18.768 1.26232 18.7683 1.26234 18.7686 1.26235Z" fill="#FF6C6C" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M18.4084 18.2387C20.8523 18.2387 22.8334 16.2575 22.8334 13.8137C22.8334 11.3698 20.8523 9.38867 18.4084 9.38867C15.9645 9.38867 13.9834 11.3698 13.9834 13.8137C13.9834 16.2575 15.9645 18.2387 18.4084 18.2387Z" fill="white"/>
      </g>
    </svg>
  `;

  return `
    <div class="pin-marker">
      ${iconHTML}
      <div class="pin-marker-name">${name}</div>
    </div>
  `;
};

// Popdeal Marker HTML
const getPopdealMarkerHTML = (data: Extract<TMarkerData, { type: 'popdeal' }>): string => {
  const { discountRate, price, originalPrice, category, active, title } = data;

  return `
    <div class="popdeal-marker" active="${!!active}">
      <div class="popdeal-marker-section">
        <div class="popdeal-marker-section-header">
          <span class="popdeal-marker-title">${title}</span>
          ${category ? `<span class="popdeal-marker-category">${category}</span>` : ''}
        </div>
        <div class="popdeal-marker-section-price">
          ${originalPrice ? `<span class="popdeal-marker-original_price">${originalPrice.toLocaleString()}원</span>` : ''}
          ${discountRate ? `<span class="popdeal-marker-discount_rate">${discountRate}%</span>` : ''}
          <span class="popdeal-marker-discounted_price">${price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  `;
};

// PI Marker HTML (compact)
const getPiMarkerHTML = (data: IPiMarkerData): string => {
  const { title, icon } = data;
  return `
    <div class="pi-marker">
      ${icon ? `<img class="pi-marker-icon" src="${icon}" alt="" width="32px" height="32px" />` : ''}
      <span class="pi-marker-text">${title}</span>
    </div>
  `;
};

// PI Expanded Marker HTML
const getPiExpandedMarkerHTML = (data: IPiMarkerData): string => {
  const { title, icon, address } = data;
  return `
    <div class="pi-expanded-marker">
      ${icon ? `<img class="pi-expanded-marker-icon" src="${icon}" alt="" width="32px" height="32px" />` : ''}
      <div class="pi-expanded-marker-content">
        <div class="pi-expanded-marker-title">${title}</div>
        ${address ? `<div class="pi-expanded-marker-address">${address}</div>` : ''}
      </div>
    </div>
  `;
};

// Cluster Marker HTML
const getClusterMarkerHTML = (data: Extract<TMarkerData, { type: 'cluster' }>): string => `
  <div class="cluster-marker">
    <span class="cluster-marker-text">${data.count}</span>
  </div>
`;

// Main function to get marker HTML by type
export const getMarkerHTML = (data: TMarkerData): string => {
  switch (data.type) {
    case 'pin':
      return getPinMarkerHTML(data);
    case 'popdeal':
      return getPopdealMarkerHTML(data);
    case 'pi':
      return getPiMarkerHTML(data);
    case 'pi-expanded':
      return getPiExpandedMarkerHTML(data);
    case 'cluster':
      return getClusterMarkerHTML(data);
    default:
      return '';
  }
};

// CSS styles as a string to be injected
export const markerStyles = `
  /* Common marker styles */
  [class$="marker"] {
    user-select: none;
  }

  /* Pin Marker */
  .pin-marker {
    position: relative;
    z-index: 10;
    transform: translate(-50%, -100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .pin-marker-name {
    min-width: max-content;
    color: #1A1A1A;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.4;
    text-shadow:
      -2px -2px 0 white,
      2px -2px 0 white,
      -2px 2px 0 white,
      2px 2px 0 white;
  }

  /* Popdeal Marker */
  .popdeal-marker {
    transform: translate(-50%, -100%);
    padding: 10px 16px;
    width: fit-content;
    max-width: 210px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    transition: border-color 0.2s ease-in-out;
    word-break: keep-all;
    background: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    color: #3D3D3D;
  }

  .popdeal-marker:hover {
    z-index: 10;
    filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.12));
  }

  .popdeal-marker::after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    bottom: -7px;
    left: 50%;
    right: 50%;
    background: white;
    transform: translate(-50%) rotate(45deg);
  }

  .popdeal-marker[active="true"] {
    z-index: 10;
    border: 2px solid #00C4C4;
  }

  .popdeal-marker[active="true"]::after {
    border-right: 2px solid #00C4C4;
    border-bottom: 2px solid #00C4C4;
  }

  .popdeal-marker[active="false"] {
    border: 1px solid #F5F5F5;
  }

  .popdeal-marker[active="false"]::after {
    border-right: 1px solid #F5F5F5;
    border-bottom: 1px solid #F5F5F5;
  }

  .popdeal-marker-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0;
    flex-wrap: nowrap;
  }

  .popdeal-marker-section-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    flex-wrap: nowrap;
  }

  .popdeal-marker-section-price {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 4px;
    flex-wrap: wrap;
  }

  .popdeal-marker-title {
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .popdeal-marker-discount_rate {
    color: #00C4C4;
    font-weight: 600;
    font-size: 14px;
  }

  .popdeal-marker-discounted_price {
    color: #3D3D3D;
    font-weight: 600;
    font-size: 14px;
  }

  .popdeal-marker-original_price {
    width: 100%;
    color: #B3B3B3;
    text-align: center;
    font-size: 14px;
    text-decoration: line-through;
  }

  .popdeal-marker-category {
    color: #6E6E6E;
    font-weight: 600;
    font-size: 12px;
  }

  .popdeal-marker-category::before {
    content: "|";
    color: #B3B3B3;
    margin-right: 4px;
  }

  /* PI Marker */
  .pi-marker {
    transform: translate(-50%, -50%);
    z-index: 10;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .pi-marker-icon {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
  }

  .pi-marker-text {
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    min-width: max-content;
    padding: 4px 8px;
    background: white;
    font-size: 12px;
    border-radius: 99px;
    color: #3D3D3D;
    box-shadow: 0 0.432px 0.864px 0 rgba(0, 0, 0, 0.28);
  }

  /* PI Expanded Marker */
  .pi-expanded-marker {
    transform: translate(-50%, -50%);
    z-index: 100;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12));
  }

  .pi-expanded-marker-icon {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
  }

  .pi-expanded-marker-content {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: 200px;
    padding: 16px;
    word-break: keep-all;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 8px;
  }

  .pi-expanded-marker-title {
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: #1A1A1A;
  }

  .pi-expanded-marker-address {
    font-size: 14px;
    color: #6E6E6E;
    width: 100%;
    text-align: center;
  }

  /* Cluster Marker */
  .cluster-marker {
    width: fit-content;
    min-width: 52px;
    height: 36px;
    padding: 13px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: #00C4C4;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
    transform: translate(-50%, -50%);
  }

  .cluster-marker-text {
    font-weight: 700;
    font-size: 15px;
    color: white;
  }

  .cluster-marker::after {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    bottom: -2px;
    left: 50%;
    right: 50%;
    background: #00C4C4;
    transform: translate(-50%) rotate(45deg);
  }
`;
