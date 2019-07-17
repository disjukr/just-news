import { Article } from '../index';
import { clearStyles } from '../util';

export function parse(): Article {
  const TITLE_SELECTOR = '.articleSubecjt'
  const CONTENT_SELECTOR = '#realArtcContents'
  const CREATED_SELECTOR = 'span.firstDate>em'
  const LAST_MOD_SELECTOR = 'span.lastDate>em'

  const parseDateString = (selector: string) => {
      const dateString = document.querySelector(selector)!.textContent;
      if (dateString) {
          return new Date(dateString);
      }
      return undefined;
  }

  return {
      title: document.querySelector(TITLE_SELECTOR)!.innerHTML,
      content: (() => {
          const content = document.querySelector(CONTENT_SELECTOR)!;

          content.querySelectorAll('script').forEach(node => {
              node.remove();
          })
          content.querySelectorAll('a[href]').forEach(node => {
              const parentToRemove = node.parentNode;
              if (parentToRemove && parentToRemove !== content) {
                  parentToRemove.parentNode!.removeChild(parentToRemove);
              } else {
                  node.remove();
              }
          })

          return clearStyles(content).innerHTML;
      })(),
      timestamp: {
          created: parseDateString(CREATED_SELECTOR),
          lastModified: parseDateString(LAST_MOD_SELECTOR),
      },
  }
}
