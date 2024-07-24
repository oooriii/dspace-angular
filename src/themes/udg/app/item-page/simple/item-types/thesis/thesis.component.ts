import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
//import { ThesisComponent as BaseComponent } from '../../../../../../../app/item-page/simple/item-types/thesis/thesis.component';
import { ItemComponent } from '../../../../../../../app/item-page/simple/item-types/shared/item.component';

/**
 * Component that represents a publication Item page
 */

@listableObjectComponent('Thesis', ViewMode.StandalonePage, Context.Any, 'udg')
@Component({
  selector: 'ds-thesis',
  styleUrls: ['./thesis.component.scss'],
  //styleUrls: ['../../../../../../../app/item-page/simple/item-types/publication/publication.component.scss'],
  templateUrl: './thesis.component.html',
  //templateUrl: '../../../../../../../app/item-page/simple/item-types/publication/publication.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//export class ThesisComponent extends BaseComponent {
  export class ThesisComponent extends ItemComponent {

}
