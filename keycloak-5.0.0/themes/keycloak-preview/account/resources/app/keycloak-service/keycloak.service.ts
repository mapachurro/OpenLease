/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {KeycloakLoginOptions} from './keycloak.d';

// If using a local keycloak.js, uncomment this import.  With keycloak.js fetched
// from the server, you get a compile-time warning on use of the Keycloak()
// method below.  I'm not sure how to fix this, but it's certainly cleaner
// to get keycloak.js from the server.
// 
import * as Keycloak from './keycloak';

export type KeycloakClient = Keycloak.KeycloakInstance;
type InitOptions = Keycloak.KeycloakInitOptions;

declare const keycloak: KeycloakClient;

export class KeycloakService {
    private static keycloakAuth: KeycloakClient = keycloak;
    private static instance: KeycloakService = new KeycloakService();

    private constructor() {
        
    }
    
    public static get Instance(): KeycloakService  {
        return this.instance;
    }
    
    /**
     * Configure and initialize the Keycloak adapter.
     *
     * @param configOptions Optionally, a path to keycloak.json, or an object containing
     *                      url, realm, and clientId.
     * @param adapterOptions Optional initiaization options.  See javascript adapter docs
     *                       for details.
     * @returns {Promise<T>}
     */
    static init(configOptions?: string|{}, initOptions: InitOptions = {}): Promise<any> {
        KeycloakService.keycloakAuth = Keycloak(configOptions);

        return new Promise((resolve, reject) => {
            KeycloakService.keycloakAuth.init(initOptions)
                .success(() => {
                    resolve();
                })
                .error((errorData: any) => {
                    reject(errorData);
                });
        });
    }
    
    authenticated(): boolean {
        return KeycloakService.keycloakAuth.authenticated ? KeycloakService.keycloakAuth.authenticated : false;
    }

    login(options?: KeycloakLoginOptions) {
        KeycloakService.keycloakAuth.login(options);
    }

    logout(redirectUri?: string) {
        KeycloakService.keycloakAuth.logout({redirectUri: redirectUri});
    }

    account() {
        KeycloakService.keycloakAuth.accountManagement();
    }
    
    authServerUrl(): string | undefined {
        return KeycloakService.keycloakAuth.authServerUrl;
    }
    
    realm(): string | undefined {
        return KeycloakService.keycloakAuth.realm;
    }

    getToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (KeycloakService.keycloakAuth.token) {
                KeycloakService.keycloakAuth
                    .updateToken(5)
                    .success(() => {
                        resolve(<string>KeycloakService.keycloakAuth.token);
                    })
                    .error(() => {
                        reject('Failed to refresh token');
                    });
            } else {
                reject('Not loggen in');
            }
        });
    }
}
