import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomePageComponent } from "../pages/home-page/home-page.component";


describe('Home page', () => {
    let fixture: ComponentFixture<HomePageComponent>;
    let component: HomePageComponent;

    beforeEach (() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
    });

    it('Check home page initiated', () => {
        expect(component).toBeTruthy();
    });

})