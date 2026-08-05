function getRenderedImageBounds(image, rect) {
  const naturalRatio = image.naturalWidth / image.naturalHeight;
  const elementRatio = rect.width / rect.height;

  if (!naturalRatio || !elementRatio) return rect;

  if (naturalRatio > elementRatio) {
    const height = rect.width / naturalRatio;
    return {
      left: rect.left,
      top: rect.top + (rect.height - height) / 2,
      width: rect.width,
      height,
    };
  }

  const width = rect.height * naturalRatio;
  return {
    left: rect.left + (rect.width - width) / 2,
    top: rect.top,
    width,
    height: rect.height,
  };
}

function setZoomOrigin(image, event) {
  const imageRect = image.parentElement.getBoundingClientRect();
  const renderedBounds = getRenderedImageBounds(image, imageRect);
  const x = Math.min(Math.max(event.clientX, renderedBounds.left), renderedBounds.left + renderedBounds.width);
  const y = Math.min(Math.max(event.clientY, renderedBounds.top), renderedBounds.top + renderedBounds.height);
  const xPercent = ((x - imageRect.left) / imageRect.width) * 100;
  const yPercent = ((y - imageRect.top) / imageRect.height) * 100;

  image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
}

function enableZoomOnHover(zoomRatio = 2) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('.image-magnify-hover').forEach((image) => {
    if (image.dataset.hoverZoomReady === 'true') return;

    const opener = image.closest('.product__modal-opener--image');
    if (!opener) return;

    image.dataset.hoverZoomReady = 'true';
    image.style.setProperty('--hover-zoom-ratio', zoomRatio);

    opener.addEventListener('pointerenter', (event) => {
      setZoomOrigin(image, event);
      image.classList.add('is-hover-zoomed');
    });

    opener.addEventListener('pointermove', (event) => {
      if (image.classList.contains('is-hover-zoomed')) setZoomOrigin(image, event);
    });

    opener.addEventListener('pointerleave', () => {
      image.classList.remove('is-hover-zoomed');
      image.style.removeProperty('transform-origin');
    });
  });
}

enableZoomOnHover(2);
