import puppeteer from 'puppeteer';

import { JobResult } from '..';

export type Reporter<T extends (Buffer | string | void)> =
    (jobResults: JobResult[], browser: puppeteer.Browser) => (Promise<T> | T);
