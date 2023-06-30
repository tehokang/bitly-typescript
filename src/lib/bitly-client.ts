import axios, { AxiosResponse } from "axios";
import axiosDebugLog from "axios-debug-log";
import { group } from "console";

export class HttpClient {
	private baseUrl: string;
	private authToken: string;

	constructor(baseUrl: string, accessToken: string) {
		this.baseUrl = baseUrl;
		this.authToken = accessToken;

		axiosDebugLog({
			request: (debug, config) => {
				console.log(`request: ${config.method} ${config.url}`);
				// console.log(` ### headers: \n ${JSON.stringify(config.headers, null, 2)}`);
				// console.log(` ### data: \n ${JSON.stringify(config.data, null, 2)}`);
			},
			response: (debug, response) => {
				console.log(`response status: ${response.status} ${response.statusText}`);
				// console.log(` ### headers: \n ${JSON.stringify(response.headers, null, 2)}`);
				console.log(` ### data: \n ${JSON.stringify(response.data, null, 2)}`);
			},
			error: (debug, error) => {
				console.log(`error message: ${error.message}`);
				console.log(` ### response: ${JSON.stringify(error.response, null, 2)}`);
			},
		});
	}

	public async post<T>(path: string, data: any): Promise<T> {
		const url = this.buildUrl(path);
		const headers = this.buildHeaders();
		const response: AxiosResponse<T> = await axios.post(url, data, { headers });
		return response.data;
	}

	public async delete<T>(path: string): Promise<T> {
		const url = this.buildUrl(path);
		const headers = this.buildHeaders();
		const response: AxiosResponse<T> = await axios.delete(url, { headers });
		return response.data;
	}

	public async patch<T>(path: string, data: any): Promise<T> {
		const url = this.buildUrl(path);
		const headers = this.buildHeaders();
		const response: AxiosResponse<T> = await axios.patch(url, data, { headers });
		return response.data;
	}

	public async get<T>(path: string, params?: any): Promise<T> {
		const url = this.buildUrl(path);
		const headers = this.buildHeaders();
		const response: AxiosResponse<T> = await axios.get(url, { params, headers });
		return response.data;
	}

	private buildHeaders(): any {
		return {
			Authorization: `Bearer ${this.authToken}`,
		};
	}

	private buildUrl(path: string): string {
		return `${this.baseUrl}/${path}`;
	}
}

export enum Unit {
	MONTH = "month",
	WEEK = "week",
	DAY = "day",
	HOUR = "hour",
	MINUTE = "minute",
}

export interface QrSchema {
	color?: string;
	exclude_bitly_logo?: boolean;
	image_format?: string;
	logo_image_guid?: string;
	is_hidden?: boolean;
}

export class Bitly extends HttpClient {
	constructor(apiUrl: string, apiVersion: string, accessToken: string) {
		super(`${apiUrl}/${apiVersion}`, accessToken);
	}

	public async shorten(url: string) {
		return await this.post(`shorten`, {
			long_url: url,
		});
	}

	public async createBitlink(url: string, groupId: string, title: string) {
		return await this.post(`bitlinks`, {
			long_url: url,
			domain: "bit.ly",
			group_guid: groupId,
			title: title,
		});
	}

	public async deleteBitlink(bitlink: string) {
		return await this.delete(`bitlinks/${bitlink}`);
	}

	public async updateBitlink(bitlink: string, title: string, archived: boolean, tags: []) {
		return await this.patch(`bitlinks/${bitlink}`, {
			title: title,
			archived: archived,
			tags: tags,
		});
	}

	public async retrieveBitlink(bitlink: string) {
		return await this.get(`bitlinks/${bitlink}`);
	}

	public async getClicksForBitlink(bitlink: string, unit: Unit) {
		return await this.get(`bitlinks/${bitlink}/clicks?unit=${unit}&units=1`);
	}

	public async getMetricsForBitlinkByCountry(bitlink: string, unit: Unit) {
		return await this.get(`bitlinks/${bitlink}/countries?unit=${unit}&units=1`);
	}

	public async createQRcode(bitlink: string) {
		return await this.post(`bitlinks/${bitlink}/qr`, {});
	}

	public async retrieveQRcode(bitlink: string) {
		return await this.get(`bitlinks/${bitlink}/qr`);
	}

	public async updateQRcode(bitlink: string, param: QrSchema) {
		return await this.patch(`bitlinks/${bitlink}/qr`, param);
	}

	public async expandBitlink(bitlink: string) {
		return await this.post(`expand`, {
			bitlink_id: bitlink,
		});
	}

	public async retrieveBitlinksByGroup(
		groupId: string,
		{
			size,
			search_after,
			keyword,
			query,
			created_before,
			archived,
			deeplinks,
			domain_deeplinks,
			campaign_guid,
			channel_guid,
			custom_bitlink,
			tags,
			launchpad_ids,
			encoding_login,
		}: {
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
		}
	) {
		return await this.get(`groups/${groupId}/bitlinks`);
	}

	public async retrieveBitlinksSorted(groupId: string, unit: Unit, size: number) {
		return await this.get(`groups/${groupId}/bitlinks/clicks?unit=${unit}&units=1&size=${size}`)
	}
}
