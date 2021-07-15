import { TestBed } from '@angular/core/testing';

import { NoticeService } from './notice.service';

describe('Notice.ServiceService', () => {
  let service: NoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
