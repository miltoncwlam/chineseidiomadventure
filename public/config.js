window.CHINESE_IDIOM_ADVENTURE = {
  supabaseUrl: 'https://ngukhgymeveuttokeavp.supabase.co',
  supabasePublishableKey: 'sb_publishable_0bY4LAevhSVPjB9t6tcYhw_ZjuEk5vm',
  clerkPublishableKey: 'pk_live_Y2xlcmsuY2hpbmVzZWlkaW9tLnZlcmNlbC5hcHAk'
};

// Replace the three strings above with values from YOUR dashboards.
// supabaseUrl            → Project Settings → API → Project URL
// supabasePublishableKey → sb_publishable_… (not the legacy anon JWT, not service_role)
// clerkPublishableKey    → Clerk Dashboard → pk_test_… or pk_live_… (optional)
// Placeholders are ignored; the game still runs with local text and localStorage.

window.loadChineseIdiomClerk = async function loadChineseIdiomClerk() {
  const key = String((window.CHINESE_IDIOM_ADVENTURE && window.CHINESE_IDIOM_ADVENTURE.clerkPublishableKey) || '').trim();
  if (!key || key.includes('REPLACE') || !key.startsWith('pk_')) return null;
  if (window.__chineseIdiomClerkReady && window.Clerk && window.Clerk.load) return window.Clerk;

  let domain = '';
  try {
    domain = atob(key.split('_').slice(2).join('_')).replace(/[\$=]+$/g, '');
  } catch (error) {
    console.warn('Clerk publishable key could not be decoded.');
    return null;
  }

  function loadScript(src, attrs) {
    return new Promise(function (resolve, reject) {
      const found = document.querySelector('script[data-cia-src="' + src + '"]');
      if (found) {
        if (found.dataset.ciaLoaded === '1') return resolve();
        found.addEventListener('load', resolve);
        found.addEventListener('error', function () { reject(new Error('Failed to load Clerk script')); });
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-cia-src', src);
      if (attrs) Object.keys(attrs).forEach(function (name) { script.setAttribute(name, attrs[name]); });
      script.onload = function () { script.dataset.ciaLoaded = '1'; resolve(); };
      script.onerror = function () { reject(new Error('Failed to load Clerk script')); };
      document.head.appendChild(script);
    });
  }

  await loadScript('https://' + domain + '/npm/@clerk/clerk-js@5/dist/clerk.browser.js', {
    'data-clerk-publishable-key': key
  });

  const ClerkCtor = window.Clerk;
  const clerk = typeof ClerkCtor === 'function' ? new ClerkCtor(key) : ClerkCtor;
  if (!clerk || typeof clerk.load !== 'function') throw new Error('Clerk SDK did not initialize');
  await clerk.load({
    publishableKey: key,
    allowedRedirectOrigins: [
      location.origin,
      'http://localhost:3002',
      'http://127.0.0.1:3002',
      'https://chineseidiom.vercel.app'
    ]
  });
  window.Clerk = clerk;
  window.__chineseIdiomClerkReady = true;
  return clerk;
};

window.openChineseIdiomSignIn = async function openChineseIdiomSignIn() {
  window.location.assign('/sign-in');
  return true;
};
