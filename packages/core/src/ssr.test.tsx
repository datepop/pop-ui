import { renderToStaticMarkup } from 'react-dom/server';

import { Button } from './components/Button';
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
});
