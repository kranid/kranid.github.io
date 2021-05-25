/*************************************************************
 *
 *  MathJax/extensions/altdescription.js
 *  
 *  Implements an extension that inserts hidden alternative equation description in the speech or source form into the
 *  page for screen readers or other asistive technology that does not support MathML and does not allow their users to work with special MathJax a11y extensions in particular explorer.js.
 */

(function (AJAX, CALLBACK, HUB, HTML) {
  var SETTINGS = HUB.config.menuSettings;
  var AltDescription = MathJax.Extension["AltDescription"] = {
    version: "0.0.1",
    config: HUB.CombineConfig("AltDescription", {
      'alt-description-enabled': true,
      'alt-description-form': 'speech',
      'alt-description-ruleset' :  'mathspeak-default', // mathspeak-default, mathspeak-brief, mathspeak-sbrief, chromevox-default, chromevox-short, chromevox-alternative
      styles: {
        ".MJX_Alt_Description": {
          position:"absolute!important",
          top: 0, left: 0,
          clip: (HUB.Browser.isMSIE && (document.documentMode||0) < 8 ?
                 "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)"),
          padding: "1px 0 0 0!important",
          border: "0!important",
          height: "1px!important",
          width: "1px!important",
          overflow: "hidden!important",
          display:"block!important",
          //
          //  Don't allow the alternative descriptionbecome part of the selection
          //
          "-webkit-touch-callout": "none",
          "-webkit-user-select": "none",
          "-khtml-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "user-select": "none"
        },
        ".MJX_Alt_Description.MJX_Alt_Description_Block": {
          width: "100%!important"
        }
      }
    }),

    setDescriptionForm: function (msg) {
      AltDescription.config[msg.variable] = msg.value;
      if (msg.variable === 'alt-description-ruleset') {
        AltDescription.setSpeechOption();
      }
      AltDescription.updateMenu();
      AltDescription.addAltDescription(document.body);
    },
    updateMenu: function () {
      var state = !this.config['alt-description-enabled'], menu, items;
      if (MathJax.Menu) {
        menu = MathJax.Menu.menu.FindId('Accessibility', 'alt-description');
        if (menu) {
          menu = menu.submenu;
          items = menu.items;
          for (var i = 1, item; item = items[i]; i++) 
            item.disabled = state;
          var speechState = !(this.config['alt-description-form'] === 'speech' && this.config['alt-description-enabled'] && true);
          var rulesetMenu =menu.FindId('alt-description-ruleset');
          rulesetMenu.disabled =speechState;
        }
      }
    },
    enable: function () {
      var enabled =!AltDescription.config['alt-description-enabled'];
      AltDescription.config['alt-description-enabled'] =enabled;
      if (enabled) {
        AltDescription.addAltDescription(document.body);
      }
      else {
        AltDescription.removeAltDescription(document.body)    ;
      }
      AltDescription.updateMenu();
    },
    
    buildMenu: function () {
      var activate={action: AltDescription.setDescriptionForm};
      var ITEM = MathJax.Menu.ITEM;
      var altMenu =ITEM.SUBMENU(['alt-description', 'Alternative Description'],
        ITEM.CHECKBOX(['alt-description-enabled', 'Activate'], 'alt-description-enabled', {action : AltDescription.enable}),
        ITEM.SUBMENU(['alt-description-form', 'Description Form'],
          ITEM.RADIO(['speech', 'speech'], 'alt-description-form', {action: AltDescription.setDescriptionForm}),
          ITEM.RADIO(['Source', 'Source'], 'alt-description-form', {action: AltDescription.setDescriptionForm})),
        ITEM.SUBMENU(['alt-description-ruleset', 'Speech Ruleset'],
          ITEM.SUBMENU(['Mathspeak', 'Mathspeak Rules'],
            ITEM.RADIO(['mathspeak-default', 'Verbose'], 'alt-description-ruleset', activate),
            ITEM.RADIO(['mathspeak-brief', 'Brief'], 'alt-description-ruleset', activate),
            ITEM.RADIO(['mathspeak-sbrief', 'Superbrief'], 'alt-description-ruleset', activate)),
          ITEM.SUBMENU(['Chromevox', 'ChromeVox Rules'],
            ITEM.RADIO(['chromevox-default', 'Verbose'], 'alt-description-ruleset', activate),
            ITEM.RADIO(['chromevox-short', 'Short'], 'alt-description-ruleset', activate),
            ITEM.RADIO(['chromevox-alternative', 'Alternative'], 'alt-description-ruleset', activate))));
      var submenu = (MathJax.Menu.menu.FindId('Accessibility') || {}).submenu, index;
      if (submenu) {
        index = submenu.IndexOfId('alt-description');
        if (index !== null) {
          submenu.items[index] = altMenu;
        } else {
          submenu.items.push(altMenu);
        }
      }
      AltDescription.updateMenu();
    },

    syncConfig: function () {
      var settings =HUB.config.menuSettings;
      Object.keys(this.config)
        .forEach(function (key) {
          if (typeof(settings[key]) === 'undefined') {
            settings[key] =AltDescription.config[key];
          }
          else {
            AltDescription.config[key] =settings[key];
          }
        });
    },

    setSpeechOption: function    () {
      var ruleset = this.config['alt-description-ruleset'];
      var cstr = ruleset.split('-');
      sre.System.getInstance().setupEngine({
        locale: MathJax.Localization.locale,
        domain: AltDescription.Domain(cstr[0]),
        style: cstr[1],
        rules: AltDescription.RuleSet(cstr[0])
      });
    },

    Domain: function(domain) {
      switch (domain) {
        case 'chromevox':
          return 'default';
        case 'mathspeak':
        default:
          return 'mathspeak';
      }
    },

    RuleSet: function(domain) {
      switch (domain) {
        case 'chromevox':
          return ['AbstractionRules', 'SemanticTreeRules'];
        case 'mathspeak':
        default:
          return ['AbstractionRules', 'AbstractionSpanish',
                  'MathspeakRules', 'MathspeakSpanish'];
      }
    },
    
    setup: function () {
      AltDescription.syncConfig();
      HUB.Register.StartupHook('MathMenu Ready', AltDescription.buildMenu);
      if (!AltDescription.config['alt-description-enabled'])
        return;
      if (MathJax.Extension.AssistiveMML) {
        MathJax.Extension.AssistiveMML.config.disabled = true;
        SETTINGS.assistiveMML = false;
        if (MathJax.Menu)
          MathJax.Menu.cookie.assistiveMML = false;
      }
      AJAX.Styles(AltDescription.config.styles);
      HUB.Register.StartupHook("Semantic Enrich Ready", function() {
        AltDescription.setSpeechOption();
        HUB.Register.MessageHook("End Math",function (msg) {
          if (AltDescription.config['alt-description-enabled']) return AltDescription.addAltDescription(msg[1])
        });
});
    },
    
    //
    //  AltDescription sets up a state object that lists the jax and index into the jax,
    //    and a dummy callback that is used to synchronizing with MathJax.
    //    It will be called when the jax are all processed, and that will
    //    let the MathJax queue continue (it will block until then).
    //
    addAltDescription: function (node) {
      var state = {
        jax: HUB.getAllJax(node), i: 0,
        callback: MathJax.Callback({})
      };
      AltDescription.HandleMML(state);
      return state.callback;
    },

    //
    //  AltDescription removes the data-description attribute and the alternative description from
    //  all the jax.
    //
    removeAltDescription: function (node) {
      var jax = HUB.getAllJax(node), frame;
      for (var i = 0, m = jax.length; i < m; i++) {
        frame = document.getElementById(jax[i].inputID+"-Frame");
        if (frame && frame.getAttribute("data-alt-description")) {
          frame.removeAttribute("data-alt-description");
          if (frame.lastChild && frame.lastChild.className.match(/MJX_alt_description/))
            frame.removeChild(frame.lastChild);
          if (frame.firstChild.getAttribute("aria-hidden") === "true")
            frame.firstChild.removeAttribute("aria-hidden");    
        }
      }
    },

    //
    //  For each jax in the state, look up the frame.
    //  If the jax doesn't use NativeMML and hasn't already been handled:
    //    Get the MathML for the jax, taking resets into account.
    //    Add a data-alt-description attribute to the frame, and
    //    Create a span that is not visible on screen and put the alternative description in it,
    //      and add it to the frame.
    //  When all the jax are processed, call the callback.
    //
    HandleMML: function (state) {
      var speechGenerator =new sre.TreeSpeechGenerator();
      var highlighter =sre.HighlighterFactory.highlighter(
        {color: "black", alpha: .2},
        {color: "black", alpha :2},
        {renderer: MathJax.Hub.outputJax["jax/mml"][0].id,
        browser: MathJax.Hub.Browser.name}
      );

      var m = state.jax.length, jax, mml, frame, span;
      while (state.i < m) {
        jax = state.jax[state.i];
        frame = document.getElementById(jax.inputID+"-Frame");
        if (jax.outputJax !== "NativeMML" && jax.outputJax !== "PlainSource" &&
            frame) {
          try {
            mml = jax.root.toMathML("").replace(/\n */g,"").replace(/<!--.*?-->/g,"");
          } catch (err) {
            if (!err.restart) throw err; // an actual error
            return MathJax.Callback.After(["HandleMML",AltDescription,state],err.restart);
          }
          frame.setAttribute("data-alt-description",true);
          var description ='';
          if (AltDescription.config['alt-description-form'] === 'speech') {
            var walker = new sre.DummyWalker(frame, speechGenerator, highlighter, mml);
            description=walker.speech();
          }
          else {
            description = jax.originalText;
          }
          var span =frame.querySelector(".MJX_alt_description");
          if (!span) {
          span = HTML.addElement(frame,"span",{
            isMathJax: true, unselectable: "on",
            className: "MJX_alt_description"
              + (jax.root.Get("display") === "block" ? " MJX_alt_description_Block" : "")
          });
          }
          span.setAttribute("tabindex", -1);
          try {span.innerHTML = description} catch (err) {}
          frame.style.position = "relative";
//          frame.setAttribute("role","presentation");
          frame.firstChild.setAttribute("aria-hidden","true");
          span.setAttribute("role","presentation");
        }
        state.i++;
      }
      if (state.callback)
        state.callback();
    }
    
  };

  HUB.Startup.signal.Post("AltDescription Ready");

})(MathJax.Ajax,MathJax.Callback,MathJax.Hub,MathJax.HTML);

//
//  Make sure the toMathML extension is loaded before we signal
//  the load complete for AltDescription extension.  Then wait for the end
//  of the user configuration before configuring AltDescription extension. 
//
MathJax.Callback.Queue(
  ["Require",MathJax.Ajax,"[MathJax]/extensions/toMathML.js"],
["Require",MathJax.Ajax,"[MathJax]/extensions/a11y/semantic-enrich.js"],
  ["loadComplete",MathJax.Ajax,"[MathJax]/extensions/AltDescription.js"],
  function () {
    MathJax.Hub.Register.StartupHook("End Config",["setup",MathJax.Extension.AltDescription]);
  }
);
