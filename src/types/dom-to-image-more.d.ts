declare module 'dom-to-image-more' {
  export interface Options {
    filter?: (node: Node) => boolean;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: any;
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  const domToImage: {
    toBlob: (node: Node, options?: Options) => Promise<Blob>;
    toPng: (node: Node, options?: Options) => Promise<string>;
    toJpeg: (node: Node, options?: Options) => Promise<string>;
    toSvg: (node: Node, options?: Options) => Promise<string>;
    toPixelData: (node: Node, options?: Options) => Promise<Uint8ClampedArray>;
  };

  export default domToImage;
}