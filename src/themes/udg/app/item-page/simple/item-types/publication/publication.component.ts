import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import { PublicationComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/publication/publication.component';
import { Item } from 'src/app/core/shared/item.model';

/**
 * Component that represents a publication Item page
 */

@listableObjectComponent('Publication', ViewMode.StandalonePage, Context.Any, 'udg')
@Component({
  selector: 'ds-publication',
  // styleUrls: ['./publication.component.scss'],
  styleUrls: ['../../../../../../../app/item-page/simple/item-types/publication/publication.component.scss'],
  templateUrl: './publication.component.html',
  //templateUrl: '../../../../../../../app/item-page/simple/item-types/publication/publication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicationComponent extends BaseComponent {

private prefix = '/assets/udg/images/'

private thumbnails = {
  'info:eu-repo/semantics/article': 'text.png',
  'article': 'text.png',
  'Article': 'text.png',
  'text': 'text.png',

  'journal article': 'revistes.png',

  'info:eu-repo/semantics/workingPaper': 'memoria.png',
  'info:eu-repo/semantics/report': 'memoria.png',


  'info:eu-repo/semantics/doctoralThesis': 'tesis.png',
  'info:eu-repo/semantics/masterThesis': 'tesis.png',
  'info:eu-repo/semantics/bachelorThesis': 'tesis.png',
  'Thesis': 'tesis.png',

  'info:eu-repo/semantics/other': 'altre.png',

}

 /**
   * check if prefix is valid
   *
   * @param uri              the identifier of the object to retrieve
   */

 getThumbSrc(type) {
    let img = 'altre.png';
    //console.log(type.value);
    img = this.thumbnails[type.value];
    return this.prefix + img;
}


}
