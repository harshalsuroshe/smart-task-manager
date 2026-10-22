warning: in the working copy of 'backend/src/main/resources/application.properties', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'frontend/package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'frontend/package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'frontend/src/App.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'frontend/src/App.jsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/backend/src/main/resources/application.properties b/backend/src/main/resources/application.properties[m
[1mindex db86ff5..21d1c33 100644[m
[1m--- a/backend/src/main/resources/application.properties[m
[1m+++ b/backend/src/main/resources/application.properties[m
[36m@@ -26,5 +26,5 @@[m [mspring.datasource.hikari.minimum-idle=2[m
 spring.datasource.hikari.connection-timeout=30000[m
 [m
 # JWT authentication configuration[m
[31m-jwt.secret=${JWT_SECRET}[m
[32m+[m[32mjwt.secret=${JWT_SECRET:YourSuperSecretKeyForLocalDevelopmentThatIsAtLeast32CharactersLong!}[m
 jwt.expiration-ms=86400000[m
[1mdiff --git a/frontend/package-lock.json b/frontend/package-lock.json[m
[1mindex 7199f75..0151214 100644[m
[1m--- a/frontend/package-lock.json[m
[1m+++ b/frontend/package-lock.json[m
[36m@@ -8,7 +8,9 @@[m
       "name": "frontend",[m
       "version": "0.0.0",[m
       "dependencies": {[m
[32m+[m[32m        "date-fns": "^4.4.0",[m
         "react": "^19.2.8",[m
[32m+[m[32m        "react-big-calendar": "^1.20.0",[m
         "react-dom": "^19.2.8"[m
       },[m
       "devDependencies": {[m
[36m@@ -216,6 +218,15 @@[m
         "node": ">=6.0.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@babel/runtime": {[m
[32m+[m[32m      "version": "7.29.10",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.10.tgz",[m
[32m+[m[32m      "integrity": "sha512-NpugTzbKgGrNe45Ui32cN8vCFFMxVtP/9rtfwv0nP5FRDAjvYBxJcLVpYA9mr1jxP6cnIT7x9LUzuDTbWYYNRA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6.9.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@babel/template": {[m
       "version": "7.29.7",[m
       "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",[m
[36m@@ -566,6 +577,28 @@[m
         "url": "https://github.com/sponsors/oxc-project"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@popperjs/core": {[m
[32m+[m[32m      "version": "2.11.8",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@popperjs/core/-/core-2.11.8.tgz",[m
[32m+[m[32m      "integrity": "sha512-P1st0aksCrn9sGZhp8GMYwBnQsbvAWsZAX44oXNNvLHGqAOcoVxmjZiohstwQ7SqKnbR47akdNi+uleWD8+g6A==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "type": "opencollective",[m
[32m+[m[32m        "url": "https://opencollective.com/popperjs"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@restart/hooks": {[m
[32m+[m[32m      "version": "0.4.16",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@restart/hooks/-/hooks-0.4.16.tgz",[m
[32m+[m[32m      "integrity": "sha512-f7aCv7c+nU/3mF7NWLtVVr0Ra80RqsO89hO72r+Y/nvQr5+q0UFGkocElTH6MJApvReVh6JHUFYn2cw1WdHF3w==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "dequal": "^2.0.3"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "react": ">=16.8.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@rolldown/binding-android-arm-eabi": {[m
       "version": "1.2.14",[m
       "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm-eabi/-/binding-android-arm-eabi-1.2.14.tgz",[m
[36m@@ -853,7 +886,6 @@[m
       "version": "19.3.0",[m
       "resolved": "https://registry.npmjs.org/@types/react/-/react-19.3.0.tgz",[m
       "integrity": "sha512-N0rFCuH9YoxG9/m61l9MfpJKfmLOVU0em7ipIz6TRgSSkvReLB9vL85GB+yr8Bs5leqpvg96JSwF4ZS1s4viQg==",[m
[31m-      "dev": true,[m
       "license": "MIT",[m
       "peer": true,[m
       "dependencies": {[m
[36m@@ -870,6 +902,12 @@[m
         "@types/react": "^19.3.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/@types/warning": {[m
[32m+[m[32m      "version": "3.0.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@types/warning/-/warning-3.0.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-CqN8MnISMwQbLJXO3doBAV4Yw9hx9/Pyr2rZ78+NfaCnhyRA/nKrpyk6E7mKw17ZOaQdLpK9GiUjrqLzBlN3sg==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
     "node_modules/@vitejs/plugin-react": {[m
       "version": "6.1.2",[m
       "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.1.2.tgz",[m
[36m@@ -1047,6 +1085,20 @@[m
       ],[m
       "license": "CC-BY-4.0"[m
     },[m
[32m+[m[32m    "node_modules/cldrjs": {[m
[32m+[m[32m      "version": "0.5.5",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/cldrjs/-/cldrjs-0.5.5.tgz",[m
[32m+[m[32m      "integrity": "sha512-KDwzwbmLIPfCgd8JERVDpQKrUUM1U4KpFJJg2IROv89rF172lLufoJnqJ/Wea6fXL5bO6WjuLMzY8V52UWPvkA=="[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/clsx": {[m
[32m+[m[32m      "version": "2.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/convert-source-map": {[m
       "version": "2.0.0",[m
       "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",[m
[36m@@ -1073,7 +1125,28 @@[m
       "version": "3.2.3",[m
       "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",[m
       "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",[m
[31m-      "dev": true,[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/date-arithmetic": {[m
[32m+[m[32m      "version": "4.1.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/date-arithmetic/-/date-arithmetic-4.1.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-QWxYLR5P/6GStZcdem+V1xoto6DMadYWpMXU82ES3/RfR3Wdwr3D0+be7mgOJ+Ov0G9D5Dmb9T17sNLQYj9XOg==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/date-fns": {[m
[32m+[m[32m      "version": "4.4.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-4.4.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-+1UMbeh68lH1SegH83CGWwpb6OHHbpSgr3+s5Eww5M4CAgswBpoWS0AjTOfEJ33HiYKz1hdj/KTFprzXHmq/6w==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "funding": {[m
[32m+[m[32m        "type": "github",[m
[32m+[m[32m        "url": "https://github.com/sponsors/kossnocorp"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/dayjs": {[m
[32m+[m[32m      "version": "1.11.23",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/dayjs/-/dayjs-1.11.23.tgz",[m
[32m+[m[32m      "integrity": "sha512-QDTCU0M0MxR3hQfnlDJfwekQiaanm1ubOD231u73WBckQ/fsamwRLiE2GBz6D3a/xF1NgfiDLJjXBa1hYOYTtQ==",[m
       "license": "MIT"[m
     },[m
     "node_modules/debug": {[m
[36m@@ -1101,6 +1174,15 @@[m
       "dev": true,[m
       "license": "MIT"[m
     },[m
[32m+[m[32m    "node_modules/dequal": {[m
[32m+[m[32m      "version": "2.0.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/dequal/-/dequal-2.0.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=6"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/detect-libc": {[m
       "version": "2.1.2",[m
       "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",[m
[36m@@ -1111,6 +1193,16 @@[m
         "node": ">=8"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/dom-helpers": {[m
[32m+[m[32m      "version": "6.0.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/dom-helpers/-/dom-helpers-6.0.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-IKySryuFwseGkrCA/pIqlwUPOD50w1Lj/B2Yief3vBOP18k5y4t+hTqKh55gULDVeJMRitcozve+g/wVFf4sFQ==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@babel/runtime": "^7.27.1",[m
[32m+[m[32m        "csstype": "^3.1.3"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/electron-to-chromium": {[m
       "version": "1.5.459",[m
       "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.459.tgz",[m
[36m@@ -1450,6 +1542,15 @@[m
         "node": ">=10.13.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/globalize": {[m
[32m+[m[32m      "version": "1.7.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/globalize/-/globalize-1.7.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-PFymRL0PtitFOlSniuwwwNfkooi3cLQJo9Uke1+j1DsGfUkkHkwneImqVtGcqKI0TuzhAlHt7hAcgK324902HA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "cldrjs": "^0.5.4"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/globals": {[m
       "version": "17.13.0",[m
       "resolved": "https://registry.npmjs.org/globals/-/globals-17.13.0.tgz",[m
[36m@@ -1520,6 +1621,15 @@[m
         "node": ">=0.8.19"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/invariant": {[m
[32m+[m[32m      "version": "2.2.4",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",[m
[32m+[m[32m      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "loose-envify": "^1.0.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/is-extglob": {[m
       "version": "2.1.1",[m
       "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",[m
[36m@@ -1554,7 +1664,6 @@[m
       "version": "4.0.0",[m
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",[m
       "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",[m
[31m-      "dev": true,[m
       "license": "MIT"[m
     },[m
     "node_modules/jsesc": {[m
[36m@@ -1899,6 +2008,30 @@[m
         "url": "https://github.com/sponsors/sindresorhus"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/lodash": {[m
[32m+[m[32m      "version": "4.18.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.18.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-dMInicTPVE8d1e5otfwmmjlxkZoUpiVLwyeTdUsi/Caj/gfzzblBcCE5sRHV/AsjuCmxWrte2TNGSYuCeCq+0Q==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/lodash-es": {[m
[32m+[m[32m      "version": "4.18.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/lodash-es/-/lodash-es-4.18.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-J8xewKD/Gk22OZbhpOVSwcs60zhd95ESDwezOFuA3/099925PdHJ7OFHNTGtajL3AlZkykD32HykiMo+BIBI8A==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/loose-envify": {[m
[32m+[m[32m      "version": "1.4.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "js-tokens": "^3.0.0 || ^4.0.0"[m
[32m+[m[32m      },[m
[32m+[m[32m      "bin": {[m
[32m+[m[32m        "loose-envify": "cli.js"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/lru-cache": {[m
       "version": "5.1.1",[m
       "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",[m
[36m@@ -1909,6 +2042,21 @@[m
         "yallist": "^3.0.2"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/luxon": {[m
[32m+[m[32m      "version": "3.7.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/luxon/-/luxon-3.7.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-vtEhXh/gNjI9Yg1u4jX/0YVPMvxzHuGgCm6tC5kZyb08yjGWGnqAjGJvcXbqQR2P3MyMEFnRbpcdFS6PBcLqew==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=12"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/memoize-one": {[m
[32m+[m[32m      "version": "6.0.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/memoize-one/-/memoize-one-6.0.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-rkpe71W0N0c0Xz6QD0eJETuWAJGnJ9afsl1srmwPrI+yBCkge5EycXXbYRyvL29zZVUWQCY7InPRCv3GDXuZNw==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
     "node_modules/minimatch": {[m
       "version": "10.2.6",[m
       "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.6.tgz",[m
[36m@@ -1925,6 +2073,27 @@[m
         "url": "https://github.com/sponsors/isaacs"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/moment": {[m
[32m+[m[32m      "version": "2.31.0",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/moment/-/moment-2.31.0.tgz",[m
[32m+[m[32m      "integrity": "sha512-0acOTfMiWOheYS4eoWb80yYMb/JLvVv9SHbs2PehaDzfUG0Bw855SKyk0IKTnPGa5+U2bmi3W68l1+sGLX/pvw==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/moment-timezone": {[m
[32m+[m[32m      "version": "0.5.48",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/moment-timezone/-/moment-timezone-0.5.48.tgz",[m
[32m+[m[32m      "integrity": "sha512-f22b8LV1gbTO2ms2j2z13MuPogNoh5UzxL3nzNAYKGraILnbGc9NEE6dyiiiLv46DGRb8A4kg8UKWLjPthxBHw==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "moment": "^2.29.4"[m
[32m+[m[32m      },[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/ms": {[m
       "version": "2.1.3",[m
       "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",[m
[36m@@ -1968,6 +2137,15 @@[m
         "node": ">=18"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/object-assign": {[m
[32m+[m[32m      "version": "4.1.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "engines": {[m
[32m+[m[32m        "node": ">=0.10.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/optionator": {[m
       "version": "0.9.4",[m
       "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",[m
[36m@@ -2098,6 +2276,17 @@[m
         "node": ">= 0.8.0"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/prop-types": {[m
[32m+[m[32m      "version": "15.8.1",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",[m
[32m+[m[32m      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "loose-envify": "^1.4.0",[m
[32m+[m[32m        "object-assign": "^4.1.1",[m
[32m+[m[32m        "react-is": "^16.13.1"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/punycode": {[m
       "version": "2.3.1",[m
       "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",[m
[36m@@ -2138,11 +2327,40 @@[m
       