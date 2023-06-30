export declare class HttpClient {
    private baseUrl;
    private authToken;
    constructor(baseUrl: string, accessToken: string);
    post<T>(path: string, data: any): Promise<T>;
    delete<T>(path: string): Promise<T>;
    patch<T>(path: string, data: any): Promise<T>;
    get<T>(path: string, params?: any): Promise<T>;
    private buildHeaders;
    private buildUrl;
}
export declare enum Unit {
    MONTH = "month",
    WEEK = "week",
    DAY = "day",
    HOUR = "hour",
    MINUTE = "minute"
}
export interface QrSchema {
    color?: string;
    exclude_bitly_logo?: boolean;
    image_format?: string;
    logo_image_guid?: string;
    is_hidden?: boolean;
}
export declare class Bitly extends HttpClient {
    constructor(apiUrl: string, apiVersion: string, accessToken: string);
    shorten(url: string): Promise<unknown>;
    createBitlink(url: string, groupId: string, title: string): Promise<unknown>;
    deleteBitlink(bitlink: string): Promise<unknown>;
    updateBitlink(bitlink: string, title: string, archived: boolean, tags: []): Promise<unknown>;
    retrieveBitlink(bitlink: string): Promise<unknown>;
    getClicksForBitlink(bitlink: string, unit: Unit): Promise<unknown>;
    getMetricsForBitlinkByCountry(bitlink: string, unit: Unit): Promise<unknown>;
    createQRcode(bitlink: string): Promise<unknown>;
    retrieveQRcode(bitlink: string): Promise<unknown>;
    updateQRcode(bitlink: string, param: QrSchema): Promise<unknown>;
    expandBitlink(bitlink: string): Promise<unknown>;
    retrieveBitlinksByGroup(groupId: string, { size, search_after, keyword, query, created_before, archived, deeplinks, domain_deeplinks, campaign_guid, channel_guid, custom_bitlink, tags, launchpad_ids, encoding_login, }: {
        size?: number;
        search_after?: string;
        keyword?: string;
        query?: string;
        created_before?: number;
        archived?: string;
        deeplinks?: string;
        domain_deeplinks?: string;
        campaign_guid?: string;
        channel_guid?: string;
        custom_bitlink?: string;
        tags?: [];
        launchpad_ids?: [];
        encoding_login?: [];
    }): Promise<unknown>;
    retrieveBitlinksSorted(groupId: string, unit: Unit, size: number): Promise<unknown>;
}
