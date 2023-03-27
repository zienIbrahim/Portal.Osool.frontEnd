import { TestBed } from '@angular/core/testing';

import { SubscriptionGuard } from './subscription.guard';

describe('Subscription Guards', () => {
    let subscriptionGuard: SubscriptionGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [SubscriptionGuard],
        });
        subscriptionGuard = TestBed.inject(SubscriptionGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            subscriptionGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
