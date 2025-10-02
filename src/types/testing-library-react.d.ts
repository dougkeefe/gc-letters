declare module '@testing-library/react' {
  import { ReactElement } from 'react';

  export interface RenderResult {
    container: HTMLElement;
    baseElement: HTMLElement;
    debug: (element?: HTMLElement | HTMLElement[]) => void;
    rerender: (ui: ReactElement) => void;
    unmount: () => void;
    asFragment: () => DocumentFragment;
    getByTestId: (id: string) => HTMLElement;
    queryByTestId: (id: string) => HTMLElement | null;
    findByTestId: (id: string) => Promise<HTMLElement>;
    querySelector: (selector: string) => HTMLElement | null;
    querySelectorAll: (selector: string) => NodeListOf<HTMLElement>;
  }

  export interface RenderOptions {
    container?: HTMLElement;
    baseElement?: HTMLElement;
    wrapper?: React.ComponentType;
  }

  export function render(
    ui: ReactElement,
    options?: RenderOptions
  ): RenderResult;

  export function screen(): {
    getByTestId: (id: string) => HTMLElement;
    queryByTestId: (id: string) => HTMLElement | null;
    findByTestId: (id: string) => Promise<HTMLElement>;
  };
}
