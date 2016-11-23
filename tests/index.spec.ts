// angular
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// module
import { ConfigModule } from '../index';

export const mockBackendResponse = (connection: MockConnection, response: any) => {
    connection.mockRespond(new Response(new ResponseOptions({ body: response })));
};

export const mockBackendError = (connection: MockConnection, error: string) => {
    connection.mockError(new Error(error));
};

export const apiEndpoint = '/config.json';
export const testSettings = {
    'system': {
        'applicationName': 'Mighty Mouse',
        'applicationUrl': 'http://localhost:8000'
    },
    'i18n': {
        'locale': 'en'
    }
};

// test module configuration for each test
export const testModuleConfig = (moduleOptions?: any) => {
    // reset the test environment before initializing it.
    TestBed.resetTestEnvironment();

    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
        .configureTestingModule({
            imports: [
                HttpModule,
                ConfigModule.forRoot(moduleOptions)
            ],
            providers: [
                {
                    provide: Http,
                    useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend,
                BaseRequestOptions
            ]
        });
};
