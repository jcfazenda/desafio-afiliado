import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'tag',
    templateUrl    : './tag.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
