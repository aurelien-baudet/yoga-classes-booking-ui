
export interface Page<T> {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: T[];
  isFirst(): boolean;
  isLast(): boolean;
  hasNext(): boolean;
  hasPrevious(): boolean;
}
export class Page<T> implements Page<T> {
  constructor(elementMapper: (e: T) => T, page: Page<T>) {
    this.content = page.content ? page.content.map(elementMapper) : page.content;
    this.totalPages = page.totalPages;
    this.totalElements = page.totalElements;
    this.number = page.number;
    this.size = page.size;
    this.numberOfElements = page.numberOfElements;
  }

  static from<T>(elementMapper: (e: T) => T, page: Page<T>): Page<T> {
    return page ? new Page<T>(elementMapper, page) : null;
  }

  isFirst(): boolean {
    return !this.hasPrevious();
  }

  hasPrevious() {
    return this.number > 0;
  }

  isLast(): boolean {
    return !this.hasNext();
  }

  hasNext() {
    return this.number + 1 < this.totalPages;
  }
}


export interface PageRequest {
  page: number;
  size: number;
  next(): PageRequest;
  previous(): PageRequest;
}
export class PageRequest implements PageRequest {
  constructor(public page = 0,
              public size = 5) { }

  next(): PageRequest {
    return new PageRequest(this.page + 1, this.size);
  }

  previous(): PageRequest {
    return new PageRequest(this.page - 1, this.size);
  }
}
