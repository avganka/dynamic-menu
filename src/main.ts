import './style.css';

//function debounce(cb: Function, ms = 300) {
//  let timeout: ReturnType<typeof setTimeout>;
//  return function (this: any, ...args: any[]) {
//    clearTimeout(timeout);
//    timeout = setTimeout(() => cb.apply(this, args), ms);
//  };
//}

(() => {
  const btn = document.querySelector<HTMLButtonElement>('.button');
  const vLinks = document.querySelector<HTMLDivElement>('.list');
  const hLinks = document.querySelector<HTMLDivElement>('.hidden_list');

  let itemsCount = 0;
  let totalWidthOfAllMenuElements = 0;
  let breakWidths: number[] = [];

  if (vLinks) {
    const children = vLinks.children;
    for (let i = 0; i < children.length; i++) {
      const vLink = children[i] as HTMLElement;
      totalWidthOfAllMenuElements += vLink.offsetWidth;
      itemsCount += 1;
      breakWidths.push(totalWidthOfAllMenuElements);
    }
  }

  let availableSpace: number;
  let numOfVisibleItems: number;
  let requiredSpace: number;

  function check() {
    if (vLinks && hLinks) {
      availableSpace = vLinks.clientWidth - 10;
      numOfVisibleItems = vLinks.children.length;
      requiredSpace = breakWidths[numOfVisibleItems - 1];
      console.log(breakWidths);

      if (requiredSpace > availableSpace) {
        hLinks.prepend(vLinks.children[vLinks.children.length - 1]);
        numOfVisibleItems -= 1;
        check();
      } else if (availableSpace > breakWidths[numOfVisibleItems]) {
        vLinks.append(hLinks.children[0]);
        numOfVisibleItems += 1;
      }
    }
    if (btn) {
      if (numOfVisibleItems === itemsCount) {
        btn.classList.add('hidden');
      } else {
        btn.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('resize', () => {
    check();
  });

  check();
})();
