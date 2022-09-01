'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">cabilForm documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' : 'data-target="#xs-components-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' :
                                            'id="xs-components-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' : 'data-target="#xs-directives-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' :
                                        'id="xs-directives-links-module-AppModule-531f5b3c190343aca5b90c040ff3557818890db3f77663f43c822a2b067df8db9603c6662015d8a16b3b35235f60a2852138e17be0ab561ffb69b72b09829329"' }>
                                        <li class="link">
                                            <a href="directives/ExcelreaderDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExcelreaderDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageModule.html" data-type="entity-link" >HomePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomePageModule-592cbedce6f7b532f7274eb906dba5922677edf070a86b711df82fdc46934aa07948bff77e10f27a7261db2ea27d7a6cd3b8a0dad206086492cd2767f9ae7c13"' : 'data-target="#xs-components-links-module-HomePageModule-592cbedce6f7b532f7274eb906dba5922677edf070a86b711df82fdc46934aa07948bff77e10f27a7261db2ea27d7a6cd3b8a0dad206086492cd2767f9ae7c13"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomePageModule-592cbedce6f7b532f7274eb906dba5922677edf070a86b711df82fdc46934aa07948bff77e10f27a7261db2ea27d7a6cd3b8a0dad206086492cd2767f9ae7c13"' :
                                            'id="xs-components-links-module-HomePageModule-592cbedce6f7b532f7274eb906dba5922677edf070a86b711df82fdc46934aa07948bff77e10f27a7261db2ea27d7a6cd3b8a0dad206086492cd2767f9ae7c13"' }>
                                            <li class="link">
                                                <a href="components/AnswersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnswersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SurveyformComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SurveyformComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomePageRoutingModule.html" data-type="entity-link" >HomePageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SurveyService.html" data-type="entity-link" >SurveyService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/_pregunta.html" data-type="entity-link" >_pregunta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Credentials.html" data-type="entity-link" >Credentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Survey.html" data-type="entity-link" >Survey</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});