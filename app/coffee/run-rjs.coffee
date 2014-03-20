require.config

    baseUrl: "/app/js"

    packages: [
        {
            name: 'wire'
            location: 'vendor/wire'
            main: 'wire'
        }
        {
            name: 'when'
            location: 'vendor/when'
            main: 'when'
        }
        {
            name: 'meld'
            location: 'vendor/meld'
            main: 'meld'
        }
        {
            name: 'cola'
            location: 'vendor/cola'
            main: 'cola'
        }
        {
            name: 'poly'
            location: 'vendor/poly'
            main: 'poly'
        }
    ]

    paths:
        # vendor

        "text": "vendor/text"
        "i18n": "vendor/i18n"
        "domReady": "vendor/wire/domReady"
        "css": "vendor/curl/src/curl/plugin/css"
        # controls

        "linkControl"           : "controls/link/linkControl"
        "textControl"           : "controls/text/textControl"
        "boxControl"            : "controls/box/boxControl"
        "buttonControl"         : "controls/button/buttonControl"
        "switchControl"         : "controls/switch/switchControl"
        "inputTextControl"      : "controls/inputText/inputTextControl"
        "comboboxControl"       : "controls/combobox/comboboxControl"
        "checkboxControl"       : "controls/checkbox/checkboxControl"
        "navigationBarControl"  : "controls/navigationbar/navigationBarControl"
        "hintControl"           : "controls/hint/hintControl"
        "dropDownListControl"   : "controls/dropdownlist/dropDownListControl"
        "flightPointControl"    : "controls/flightpoint/flightPointControl"
        "inputError"            : "controls/error/inputError"
        "tableControl"          : "controls/table/tableControl"
        "popupControl"          : "controls/popup/popupControl"
        "infoControl"           : "controls/info/infoControl"

    shim:
        marionette: ["backbone"]

    hbs:
        templateExtension: ".html"

    locale: "ru"


# Bootstrap the app. Notice that curl is not a global, only define.
#global define
require ['wire!main'], (main) ->
    console.log main

    
