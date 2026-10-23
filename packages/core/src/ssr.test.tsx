import { renderToStaticMarkup } from 'react-dom/server';

import { Button } from './components/Button';
import { LottieInput } from './components/LottieInput';
import { Modal } from './components/Modal';
import { TextField } from './components/TextField';
import { PopUiProvider } from './theme/ThemeProvider';

describe('core package SSR contract', () => {
  it('renders the primary components without browser globals', () => {
    vi.stubGlobal('document', undefined);
    vi.stubGlobal('window', undefined);

    try {
      const markup = renderToStaticMarkup(
        <PopUiProvider>
          <Button>SSR button</Button>
          <TextField label="Name" defaultValue="SSR value" />
          <Modal opened={false} onClose={() => undefined}>
            SSR modal
          </Modal>
        </PopUiProvider>,
      );

      expect(markup).toContain('SSR button');
      expect(markup).toContain('SSR value');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('renders LottieInput tiles while the lazy lottie player is still loading', () => {
    vi.stubGlobal('document', undefined);
    vi.stubGlobal('window', undefined);

    try {
      const markup = renderToStaticMarkup(
        <PopUiProvider>
          <LottieInput
            value={[{ id: 'a', animationData: { v: '5', fr: 30, ip: 0, op: 60, layers: [] } }]}
            width={120}
            height={80}
          />
        </PopUiProvider>,
      );

      expect(markup).toContain('style="width:120px;height:80px;display:block"');
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
