import { render, screen } from '@testing-library/react';

import { Loader, PageLoader } from './index';

describe('Loader component', () => {
  it('should render the Loader component', () => {
    const { container } = render(<Loader />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-aYaIB ZnIVe"
          role="progressbar"
        >
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    `);
  });

  it('should render the PageLoader component', () => {
    const { container } = render(<PageLoader />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-gEvDqW eILvVz"
        >
          <div
            class="sc-aYaIB ZnIVe"
            role="progressbar"
          >
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    `);
  });
});
