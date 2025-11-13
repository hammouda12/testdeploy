export default function PromotionCard({ title, description, image, href, buttonText = "Learn More" }) {
  const safeSrc = typeof image === "string" ? encodeURI(image) : image;
  return (
    <div className="promotion-card">
      <div className="hero relative h-full">
        <a className="block h-full" href={href}>
          <div className="wrapper">
            <div className="content-wrapper">
              <div className="content">
                <div className="badge-content">
                  <div className="badge variant-neutral-strong size-sm text-size-sm is-inline">Promotion</div>
                </div>
                <span className="text-neutral-default ds-display-sm line-clamp-2">{title}</span>
                <div className="line-clamp-2">
                  <span className="text-neutral-default ds-body-sm">{description}</span>
                </div>
              </div>
            </div>
            <div className="img-wrap">
              <div className="img-inner">
                <img 
                  className="!object-contain" 
                  alt={title} 
                  src={safeSrc} 
                  style={{ objectFit: 'fill', maxWidth: '220px', maxHeight: '220px', aspectRatio: '1 / 1', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </a>
        <div className="button-wrapper absolute bottom-[12px] left-[12px] md:bottom-[16px] md:left-[16px]">
          <a className="promo-button" href={href} style={{ minWidth: '7.5rem', maxWidth: '10.625rem' }}>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}

