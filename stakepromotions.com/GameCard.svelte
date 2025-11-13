<script>
  export let id = "";
  export let title = "";
  export let provider = "";
  export let playerCount = 0;
  export let imageUrl = "";
  export let href = "#";
  export let gradient = "";
  export let backgroundGradient = ""; // Alias for gradient
  export let ribbon = "";
  
  // Use backgroundGradient if provided, otherwise use gradient
  $: finalGradient = backgroundGradient || gradient;
</script>

<!-- ✅ ALWAYS USE SLIDE WRAPPER for uniform spacing -->
<div class="slide svelte-1vx4gmg" style="padding: var(--spacing-0) 8px;">

  <!-- ✅ Wrapper MUST be this class (like Sweet Bonanza) -->
  <div class="wrap svelte-1byrcnp">

    <div class="image-focus svelte-18fdlwo">

      <div class="game-card-wrap svelte-zglogk">

        <a class="link svelte-zglogk" href={href} data-sveltekit-preload-code="hover">

          <!-- ✅ Image container (identical to Sweet Bonanza) -->
          <div class="img-wrap wrap svelte-1byrcnp">
            <img
              id={id}
              src={imageUrl}
              alt={title}
              width="180"
              height="236"
              layout="fixed"
              aspectratio="0"
              class="max-w-full max-h-full !w-auto !h-full"
              loading="lazy"
              decoding="async"
              style={`object-fit: fill; background: ${finalGradient}; width: 100%; height: 236px;`}
              srcset={`${imageUrl} 180w, ${imageUrl.replace('w=180&h=236', 'w=360&h=472')} 360w`}
              sizes="100%"
            />
          </div>

          <!-- ✅ Player bubble (inside link, matching Sweet Bonanza structure) -->
          <div class="stack x-flex-start y-center gap-smaller padding-none direction-horizontal padding-left-auto padding-top-smaller padding-bottom-auto padding-right-auto svelte-1klblr3">
            <span style="width: 6px; height: 6px" class="scale-up block svelte-rxhcv3 is-relative"></span>
            <span type="body" tag="span" size="xs" class="ds-body-xs" data-ds-text="true">
              <span tag="span" type="body" size="xs" variant="neutral-default" class="text-neutral-default ds-body-xs" data-ds-text="true">{playerCount}</span>
              playing
            </span>
          </div>

          <!-- ✅ Info block -->
          <div class="info-wrap svelte-1byrcnp">

            <div class="game-info-container svelte-1o5l7az">
              <div class="game-info-wrap svelte-1o5l7az">
                <span type="body" tag="span" size="md" strong="true" class="ds-body-md-strong w-full text-white mb-2" data-ds-text="true">{title}</span>
              </div>
            </div>

            <div class="wrap-icon svelte-1o5l7az">
              <!--#s152--><svg data-ds-icon="Play" width="20" height="20" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" class="inline-block shrink-0">
                <path fill="currentColor" d="M8 16.31c0 .76.81 1.24 1.48.88l7.91-4.32c.69-.38.69-1.38 0-1.76L9.48 6.79C8.81 6.43 8 6.91 8 7.67z">
                </path>
              </svg>
            </div>

            <div class="game-info-wrap game-group svelte-1o5l7az">
              <strong>{provider}</strong>
            </div>

          </div>

        </a>

        <!-- Optional Ribbon -->
        {#if ribbon}
        <div class="ribbon svelte-zglogk">
          {ribbon}
        </div>
        {/if}

      </div>

    </div>

  </div>

</div>
