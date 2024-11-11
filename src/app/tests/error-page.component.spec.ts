import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ErrorPageComponent } from "../pages/error-page/error-page.component";


describe('Home page', () => {
    let fixture: ComponentFixture<ErrorPageComponent>;
    let component: ErrorPageComponent;

    beforeEach (() => {
        fixture = TestBed.createComponent(ErrorPageComponent);
        component = fixture.componentInstance;
    });

    it('Check home page initiated', () => {
        expect(component).toBeTruthy();
    });

})