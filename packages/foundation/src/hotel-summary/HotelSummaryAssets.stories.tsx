import * as Icons from '../icons';
import { IllustrationHotelRoomSoldOut } from '../illustrations';
import { hotelSummaryImages } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Foundation/Hotel Summary Assets' };
export default meta;
type TStory = StoryObj;

export const Originals: TStory = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <p>Original Datepop Android and design system artwork. Map image is a sample only.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {Object.entries(Icons)
          .filter(([name]) => name.startsWith('IconHotel'))
          .map(([name, Icon]) => (
            <div key={name} style={{ width: 180, display: 'grid', gap: 8 }}>
              <Icon />
              <span>{name}</span>
            </div>
          ))}
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'start' }}>
        <img
          src={hotelSummaryImages.favoriteOn}
          width={75}
          height={75}
          alt="Original selected favorite"
        />
        <img
          src={hotelSummaryImages.favoriteOff}
          width={75}
          height={75}
          alt="Original unselected favorite"
        />
        <img
          src={hotelSummaryImages.mapSample}
          width={160}
          alt="Sample map artwork, not an actual location"
        />
      </div>
      <img
        src={hotelSummaryImages.poploggerRecruitmentBanner}
        width={166}
        height={135}
        alt="Original Poplogger recruitment artwork"
      />
      <IllustrationHotelRoomSoldOut />
      <Icons.IconHotelFooterFavorite variant="filled" />
      <Icons.IconHotelHelpful variant="filled" />
    </div>
  ),
};
