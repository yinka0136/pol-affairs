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
                    <a href="index.html" data-type="index-link">police-api documentation</a>
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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' : 'data-target="#xs-controllers-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' :
                                            'id="xs-controllers-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' : 'data-target="#xs-injectables-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' :
                                        'id="xs-injectables-links-module-AppModule-e6e0d5ce74d1eba875c0d602e6dd44ee"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-fb61701528466943adca7b20a55197df"' : 'data-target="#xs-controllers-links-module-AuthModule-fb61701528466943adca7b20a55197df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-fb61701528466943adca7b20a55197df"' :
                                            'id="xs-controllers-links-module-AuthModule-fb61701528466943adca7b20a55197df"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-fb61701528466943adca7b20a55197df"' : 'data-target="#xs-injectables-links-module-AuthModule-fb61701528466943adca7b20a55197df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-fb61701528466943adca7b20a55197df"' :
                                        'id="xs-injectables-links-module-AuthModule-fb61701528466943adca7b20a55197df"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventModule.html" data-type="entity-link">EventModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' : 'data-target="#xs-controllers-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' :
                                            'id="xs-controllers-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' }>
                                            <li class="link">
                                                <a href="controllers/EventController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EventController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' : 'data-target="#xs-injectables-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' :
                                        'id="xs-injectables-links-module-EventModule-9df3fa5e82b45e6be9c5c8e849552b17"' }>
                                        <li class="link">
                                            <a href="injectables/EventService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EventService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GalleryModule.html" data-type="entity-link">GalleryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' : 'data-target="#xs-controllers-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' :
                                            'id="xs-controllers-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' }>
                                            <li class="link">
                                                <a href="controllers/GalleryController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GalleryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' : 'data-target="#xs-injectables-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' :
                                        'id="xs-injectables-links-module-GalleryModule-1b532f542f93e9ba63656c180190a1ae"' }>
                                        <li class="link">
                                            <a href="injectables/GalleryService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GalleryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewsArticleModule.html" data-type="entity-link">NewsArticleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' : 'data-target="#xs-controllers-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' :
                                            'id="xs-controllers-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' }>
                                            <li class="link">
                                                <a href="controllers/NewsArticleController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NewsArticleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' : 'data-target="#xs-injectables-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' :
                                        'id="xs-injectables-links-module-NewsArticleModule-d64bc28b6b029f45b6b7ceb29aa0bbce"' }>
                                        <li class="link">
                                            <a href="injectables/NewsArticleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NewsArticleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-SharedModule-16269ed401112ccb1516e719a4d49d2a"' : 'data-target="#xs-controllers-links-module-SharedModule-16269ed401112ccb1516e719a4d49d2a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SharedModule-16269ed401112ccb1516e719a4d49d2a"' :
                                            'id="xs-controllers-links-module-SharedModule-16269ed401112ccb1516e719a4d49d2a"' }>
                                            <li class="link">
                                                <a href="controllers/SharedController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SharedController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EventController.html" data-type="entity-link">EventController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GalleryController.html" data-type="entity-link">GalleryController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NewsArticleController.html" data-type="entity-link">NewsArticleController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SharedController.html" data-type="entity-link">SharedController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthCredentialsDTO.html" data-type="entity-link">AuthCredentialsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cloudinary.html" data-type="entity-link">Cloudinary</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEventDTO.html" data-type="entity-link">CreateEventDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGalleryDTO.html" data-type="entity-link">CreateGalleryDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateNewsArticleDTO.html" data-type="entity-link">CreateNewsArticleDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Event.html" data-type="entity-link">Event</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventRepository.html" data-type="entity-link">EventRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/Gallery.html" data-type="entity-link">Gallery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GalleryRepository.html" data-type="entity-link">GalleryRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEventFilterDTO.html" data-type="entity-link">GetEventFilterDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetGalleryFilterDTO.html" data-type="entity-link">GetGalleryFilterDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetNewsArticleFilterDTO.html" data-type="entity-link">GetNewsArticleFilterDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsArticle.html" data-type="entity-link">NewsArticle</a>
                            </li>
                            <li class="link">
                                <a href="classes/NewsArticleRepository.html" data-type="entity-link">NewsArticleRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginatedResultDto.html" data-type="entity-link">PaginatedResultDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDto.html" data-type="entity-link">PaginationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepository.html" data-type="entity-link">UserRepository</a>
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
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link">EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GalleryService.html" data-type="entity-link">GalleryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsArticleService.html" data-type="entity-link">NewsArticleService</a>
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
                                <a href="interfaces/TokenPayload.html" data-type="entity-link">TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/uploadedFile.html" data-type="entity-link">uploadedFile</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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