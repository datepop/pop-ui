import * as path from 'path';

import { getBaseConfig } from '../../vite.config';

export default getBaseConfig({
  preserveModules: true,
  lib: {
    entry: path.resolve(__dirname, 'src/index.ts'),
    name: 'Foundation',
    fileName: 'foundation',
  },
});
