(function() {
  class BbOneTrustSetListeners {
    init() {
      try {
        const waitForElm = (selector) => {
          return new Promise(resolve => {
            if (document.querySelector(selector)) {
              return resolve(document.querySelector(selector))
            }
            const observer = new MutationObserver(() => {
              if (document.querySelector(selector)) {
                resolve(document.querySelector(selector))
                observer.disconnect()
              }
            })
            observer.observe(document.body, {
              childList: true,
              subtree: true
            })
          })
        }

        waitForElm('.save-preference-btn-handler.onetrust-close-btn-handler').then(() => {
          const oneTrustBtnElements = [
            document.querySelector(
              '.save-preference-btn-handler.onetrust-close-btn-handler'
            ),
            document.querySelector('.ot-pc-refuse-all-handler'),
            document.querySelector('#accept-recommended-btn-handler')
          ]

          const setListener = selector => {
            selector.addEventListener('click', () => {
              window.location.reload()
            })
          }

          oneTrustBtnElements.forEach(el => {
            setListener(el)
          })
        }).catch(err => {
          console.error('bbOneTrust Error:', err)
        })
      } catch (err) {
        console.error('bbOneTrust Error:', err)
      }
    }
  }

  const bbOneTrust = {
    setListeners() {
      new BbOneTrustSetListeners().init()
    }
  }

  window.bbOneTrust = {
    setListeners: bbOneTrust.setListeners
  }
})()
