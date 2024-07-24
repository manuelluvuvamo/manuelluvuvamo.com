declare module 'rehype-pretty-code' {
    import { Transformer } from 'unified';
  
    interface Options {
      theme: string;
      onVisitLine(node: any): void;
      onVisitHighlightedLine(node: any): void;
      onVisitHighlightedWord(node: any): void;
    }
  
    const rehypePrettyCode: Transformer;
  
    export default rehypePrettyCode;
  }
  