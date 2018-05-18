import { TestBed } from '@angular/core/testing';

import { CopyService } from './copy.service';

fdescribe('CopyService', () => {

  let service: CopyService;
  let mockElement: any = document.createElement('textarea');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CopyService]
    });
    service = TestBed.get(CopyService);
    spyOn(service.dom, 'createElement').and.returnValue(mockElement);
  });

  it('should create a textarea dom element', () => {
    service.copy('foobar');
    expect(service.dom.createElement).toHaveBeenCalledWith('textarea');
  });

  it('should assign the value of the textarea to be the passed string', () => {
    service.copy('foobar');
    expect(mockElement.value).toBe('foobar');
  });

  it('should return true if the dom copy command has succeeded', () => {
    spyOn(service.dom, 'execCommand').and.returnValue(true);
    let result = service.copy('foobar');
    expect(result).toBeTruthy();
  });

  it('should return false if the dom copy command has failed', () => {
    spyOn(service.dom, 'execCommand').and.throwError('expected-test-error');
    let result = service.copy('foobar');
    expect(result).toBeFalsy();
  });

});
