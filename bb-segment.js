;(function() {
  // Segment source middleware: https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/middleware/
  function payloadComplianceMiddleware({ payload, next, integrations }) {
    // Keys to remove from each segment payload's properties object
    const payloadPropertiesKeysToRemove = [
      'url',
      'path',
      'title',
      'search',
      'referrer'
    ]

    const deletePayloadPropertiesKeys = payload => {
      // Get the current URL from the page where the event was sent from
      const currentUrl = window.location.href

      console.warn('Reached payload compliance middleware')

      // Iterate through `payloadPropertiesKeysToRemove` and remove the properties object keys from the payload `obj` object
      payloadPropertiesKeysToRemove.forEach(propertyKey => {
        if (payload.obj.properties) {
          delete payload.obj.properties[propertyKey]
        } else if (payload.obj.traits) {
          delete payload.obj.traits[propertyKey]
        }
      })

      // Explicitly set the url
      payload.obj.context.page.url = currentUrl

      return payload
    }

    deletePayloadPropertiesKeys(payload)

    // Pass the modified payload off to the next step
    next(payload)
  }

  class BbSegmentMetaData {
    init() {
      window._bbSegmentMetaData = {
        blackcrow_score: bbSegment.getCookie('bb_blackcrow_score'),
        dyid: bbSegment.getCookie('_dyid'),
        ga_gid: bbSegment.getCookie('_gid'),
        ga_cid: bbSegment.getCookie('_ga'),
        fbp: bbSegment.getCookie('_fbp'),
        fbc: bbSegment.getCookie('_fbc'),
        iterableCampaignId: bbSegment.getCookie('iterableEmailCampaignId'),
        iterableTemplateId: bbSegment.getCookie('iterableTemplateId'),
        loop_return_id: bbSegment.getCookie('_loop_return_id'),
        userAgent: window.navigator.userAgent,
        segment_write_key: bbSegment.segmentKey,
        test_id: bbSegment.getTestId(),
        sessionId: bbSegment.getCookie('_session_id'),
        experience_name: decodeURIComponent(bbSegment.getCookie('bte') ?? ''),
        experience_group: decodeURIComponent(bbSegment.getCookie('btg') ?? ''),
        experience_value: decodeURIComponent(bbSegment.getCookie('btid') ?? '')
      }
    }
  }

  class BbSegmentPageEvents {
    constructor(config) {
      this.config = config
    }

    init() {
      window.analytics.page(
        this.config.source,
        document.title,
        {
          ...window._bbSegmentMetaData,
          instapage_variant_custom_name: window.__variant_custom_name,
          session_id: bbSegment.getCookie('ajs_anonymous_id'),
          segment_write_key: bbSegment.segmentKey
        },
        {
          integrations: bbSegment.getAmplitudeIntegrations()
        }
      )

      // window.analytics.track(
      //   'Page Viewed',
      //   {
      //     ...window._bbSegmentMetaData,
      //     title: document.title,
      //     url: window.location.href,
      //     path: window.location.pathname,
      //     category: this.config.source,
      //     instapage_variant_custom_name: window.__variant_custom_name,
      //     session_id: bbSegment.getCookie('ajs_anonymous_id'),
      //     segment_write_key: bbSegment.segmentKey,
      //     referrer: document.referrer
      //   }, {
      //     integrations: bbSegment.getAmplitudeIntegrations()
      //   }
      // )
    }
  }

  class BbSegmentScript {
    constructor(config) {
      this.config = config
    }

    init() {
      if (this.config.segmentKey) {
        const analytics = (window.analytics = window.analytics || [])

        if (analytics.initialize) {
          return
        }

        if (analytics.invoked) {
          if (window.console && console.error) {
            console.error('Segment snippet included twice.')
          }
          return
        }

        analytics.invoked = true

        analytics.methods = [
          'trackSubmit',
          'trackClick',
          'trackLink',
          'trackForm',
          'pageview',
          'identify',
          'reset',
          'group',
          'track',
          'ready',
          'alias',
          'debug',
          'page',
          'once',
          'off',
          'on',
          'addSourceMiddleware',
          'addIntegrationMiddleware',
          'setAnonymousId',
          'addDestinationMiddleware'
        ]

        analytics.factory = function(method) {
          return function() {
            const args = Array.prototype.slice.call(arguments)
            args.unshift(method)
            analytics.push(args)
            return analytics
          }
        }

        for (var t = 0; t < analytics.methods.length; t++) {
          var key = analytics.methods[t]
          analytics[key] = analytics.factory(key)
        }

        analytics.load = (t, e) => {
          var n = document.createElement('script')
          n.type = 'text/javascript'
          n.async = !0
          n.src =
            'https://evs.segment.bollandbranch.com/ocirLQ1uav/bollandbranch.min.js'
          var a = document.getElementsByTagName('script')[0]
          a.parentNode.insertBefore(n, a)
          analytics._loadOptions = e
        }

        analytics._writeKey = this.config.segmentKey
        analytics._cdn = 'https://evs.segment.bollandbranch.com'
        analytics.SNIPPET_VERSION = '4.15.3'

        // Payload compliance middleware
        // analytics.addSourceMiddleware(payloadComplianceMiddleware)
        analytics.initialized || analytics.load(this.config.segmentKey)
        bbSegment.segmentKey = this.config.segmentKey
      } else {
        console.error('bbSegment missing account key')
      }
    }
  }

  class BbSegmentPopupTrackers {
    init() {
      window.addEventListener('DOMContentLoaded', function() {
        bbSegment
          .waitForElm('.dy-modal-contents')
          .then(() => {
            const dyElement = document.querySelector('.dy-modal-contents')
            const form = dyElement.querySelector('form')
            const email = form.querySelector('[name="email"]')
            const button = form.querySelector('.dytmpl-form-subscribe-button')
            const variation = dyElement
              .querySelector('[data-variation-title]')
              .getAttribute('data-variation-title')

            const emailSignUp = () => {
              bbSegment.runEmailSignUp(
                email.value,
                {
                  ...window._bbSegmentMetaData,
                  source: 'dy',
                  variation_name: variation,
                  email: email.value,
                  session_id: bbSegment
                    .getCookie('ajs_anonymous_id')
                    .replace(/%22/g, ''),
                  segment_write_key: bbSegment.segmentKey
                },
                {
                  integrations: bbSegment.getAmplitudeIntegrations()
                }
              )
            }

            form.onkeydown = e => {
              if (e.key === 'Enter') {
                emailSignUp()
              }
            }
            button.addEventListener('click', emailSignUp)
          })
          .catch(err => {
            console.error('bbSegment Error:', err)
          })
      })

      window.addEventListener(
        'message',
        function(e) {
          if (
            e.data.__attentive &&
            e.data.__attentive.action === 'EMAIL_LEAD'
          ) {
            const email = e.data.__attentive.email
            const creativeId = e.data.__attentive.creativeId

            bbSegment.runEmailSignUp(
              email,
              {
                ...window._bbSegmentMetaData,
                signup_type: 'attentive',
                email: email,
                overlay_cta: creativeId,
                session_id: bbSegment
                  .getCookie('ajs_anonymous_id')
                  .replace(/%22/g, ''),
                segment_write_key: bbSegment.segmentKey
              },
              {
                integrations: bbSegment.getAmplitudeIntegrations()
              }
            )
          }
        },
        false
      )
    }
  }

  class BbSegmentInstapageTrackers {
    init() {
      document.querySelector("form.email-form").addEventListener('submit', function(evt) {
        evt.preventDefault();
        const form = evt.target;
        const emailEl = form.querySelector("input[name='Email']")
        if (emailEl 
            && typeof emailEl?.value === "string" 
            && emailEl.value.length > 0 
            && emailEl.value.match(/[^@]+@[^@]+\.[^@]+/) ) {
          bbSegment.runEmailSignUp(emailEl.value, {
            ...window._bbSegmentMetaData,
            signup_type: 'instapage-footer',
            email: emailEl.value
          });
        } else {
          window.analytics.track('Error Occurred', {
            ...window._bbSegmentMetaData,
            error_message: "Instapage Error: Invalid email input",
            error_type: "invalid-input",
            error_value: emailEl?.value,
            is_viewable: false
          })
        }
      }); 
    }
  }

  const bbSegment = {
    waitForElm: selector => {
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
    },

    waitForScript: function(callback) {
      const intervalId = setInterval(() => {
        if (window.analytics) {
          clearInterval(intervalId)
          callback()
        }
      }, 50)
    },

    getCookie(name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) {
        return parts
          .pop()
          .split(';')
          .shift()
      }
    },

    setCookies(key, value, exp = 30) {
      document.cookie = `${key}=${value};expires=${exp};path=/;domain=.bollandbranch.com`
      document.cookie = `${key}=${value};expires=${exp};path=/;domain=localhost`
    },

    getTestId() {
      const cookieKey = '_bb_test_id'
      const url = new URL(window.location.href)
      const testId = url.searchParams.get('bb-test-id')
      if (testId) {
        this.setCookies(cookieKey, testId, 1)
      }
      return testId || this.getCookie(cookieKey)
    },

    getAmplitudeSessionId() {
      try {
        const amplitudeIdKey = '_amplitude_session_id'
        const thirtyMinsInMs = 1800000 // 30 * 60 * 1000
        const now = new Date()
        const timeNow = now.getTime()
        const newExpiry = new Date(now.getTime() + thirtyMinsInMs).toUTCString()
        const currentAmplitudeId = this.getCookie(amplitudeIdKey)
        if (currentAmplitudeId) {
          document.cookie = `${amplitudeIdKey}=${currentAmplitudeId};expires=${newExpiry};path=/;domain=bollandbranch.com`
          return currentAmplitudeId
        }
        // set new id
        document.cookie = `${amplitudeIdKey}=${timeNow};expires=${newExpiry};path=/;domain=bollandbranch.com`
        return timeNow
      } catch (error) {
        console.error('amplitude id error')
      }
    },

    identifyCustomer(userId, email, payload) {
      const userID = userId ? `${userId}` : null
      window.analytics.identify(userID, {
        email: email
      })

      window.analytics.track('Email Sign Up', payload, {
        integrations: this.getAmplitudeIntegrations()
      })
    },

    async fetchCustomer(endpoint, email) {
      return await fetch(`https://headless-api.bollandbranch.com/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      }).then(response => {
        return response.json()
      })
    },

    createCustomer(email, payload) {
      this.fetchCustomer('createEmail', email)
        .then(data => {
          this.identifyCustomer(data.customer?.id, email, payload)
        })
        .catch(err => {
          console.error(err)
        })
    },

    runEmailSignUp(email, payload) {
      this.fetchCustomer('getCustomerId', email)
        .then(data => {
          const customer = data.customers
          const customerFound = customer?.length > 0
          if (customerFound) {
            this.identifyCustomer(data.customers[0].id, email, payload)
          } else if (!customerFound) {
            this.createCustomer(email, payload)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },

    getAmplitudeIntegrations() {
      return {
        test_id: this.getTestId(),
        Amplitude: {
          session_id: this.getAmplitudeSessionId()
        }
      }
    },

    loadMetaData() {
      new BbSegmentMetaData().init()
    },

    loadPageEvents(config) {
      new BbSegmentPageEvents(config).init()
    },

    loadScript(config) {
      new BbSegmentScript(config).init()
    },

    loadPopupTrackers() {
      new BbSegmentPopupTrackers().init()
    },

    loadInstapageTrackers() {
      new BbSegmentInstapageTrackers().init()
    }
  }

  try {
    bbSegment.loadMetaData()
    console.log('bbSegment loaded')
  } catch (err) {
    console.error('Error in bbSegment:', err)
  }

  window.bbSegment = {
    loadMetaData: bbSegment.loadMetaData,
    loadPageEvents: bbSegment.loadPageEvents,
    loadScript: bbSegment.loadScript,
    loadPopupTrackers: bbSegment.loadPopupTrackers,
    loadInstapageTrackers: bbSegment.loadInstapageTrackers,
    getCookie: bbSegment.getCookie,
    setCookies: bbSegment.setCookies,
    getAmplitudeIntegrations: bbSegment.getAmplitudeIntegrations,
    getAmplitudeSessionId: bbSegment.getAmplitudeSessionId,
    getTestId: bbSegment.getTestId,
    waitForScript: bbSegment.waitForScript,
    waitForElm: bbSegment.waitForElm
  }
})()
