// Copyright (c) 2018-present Kochell Software. All Rights Reserved.
// See LICENSE.txt for license information.

export interface IStringTMap<T> { [key: string]: T }
export interface INumberTMap<T> { [key: number]: T }

export interface IStringAnyMap extends IStringTMap<any> {}
export interface INumberAnyMap extends INumberTMap<any> {}

export interface IStringStringMap extends IStringTMap<string> {}
export interface INumberStringMap extends INumberTMap<string> {}

export interface IStringNumberMap extends IStringTMap<number> {}
export interface INumberNumberMap extends INumberTMap<number> {}

export interface IStringBooleanMap extends IStringTMap<boolean> {}
export interface INumberBooleanMap extends INumberTMap<boolean> {}
