import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnInit, OnDestroy, Renderer2
} from '@angular/core';
import {ImgProvider} from "../../providers/img/img";
import {Events, Refresher} from "ionic-angular";


/**
 * This directive is charge of cache the images and emit a loaded event
 */
@Directive({
  selector: '[lazy-load]'
})
/**
 * Class LazyLoadDirective
 */
export class LazyLoadDirective implements OnInit, OnDestroy {
  // attribute inputSrc
  @Input('inputSrc') src = '';
  @Output() loaded = new EventEmitter();

  public loadEvent: any;
  public errorEvent: any;

  constructor(public el: ElementRef,
              public imgCacheService: ImgProvider,
              public renderer: Renderer2,
              public events: Events) {
    // publish event img:reload (Refresher Event & forceReload), if you like to forceReload images (https://ionicframework.com/docs/api/components/refresher/Refresher/)
    this.events.subscribe('img:reload', (refresher: Refresher, forceReload: boolean) => {
      this.load(forceReload).then(res => {
        refresher.complete();
      });
    });
  }

  ngOnInit() {
    this.load().then(res => {
      console.log('loaded')
    });
  }

  ngOnDestroy() {
    // remove listeners
    this.loadEvent();
    this.errorEvent();
  }

  /**
   * Load image.
   *
   * @param {boolean} forceReload
   * @returns {Promise<any>}
   */
  private load(forceReload: boolean = false) {
    return new Promise(resolve => {
      // get img element
      const nativeElement = this.el.nativeElement;
      const render = this.renderer;

      // add load listener
      this.loadEvent = render.listen(nativeElement, 'load', () => {
        render.addClass(nativeElement, 'loaded');
        this.loaded.emit();
      });

      this.errorEvent = render.listen(nativeElement, 'error', () => {
        nativeElement.remove();
      });

      // cache img and set the src to the img
      this.imgCacheService.cacheImg(this.src, forceReload).then((value) => {
        render.setAttribute(nativeElement, 'src', value);
        resolve();
      });
    });
  }
}
