import { ITokenModel } from "../models/ITokenModel";
import file from "./urls.json";
async function checkRefresh(token: ITokenModel): Promise<any> {
  try {
    const val = JSON.parse(atob(token.refresh_token.split(".")[1]));
    const expiration = val.exp ? val.exp * 1000 : 0;
    console.log(
      "Expiration Date: " + new Date(expiration),
      "\nCurrent Date: " + new Date(Date.now())
    );

    if (expiration < Date.now()) {
      console.log(
        await POST(file.refresh_token, { refresh_token: token.refresh_token })
      );
    }
  } catch (e) {
    console.error(e);
  }
}

export async function GET(url: string, token: ITokenModel): Promise<any> {
  try {
    checkRefresh(token);
    const headers: any = {};

    if (token != null) {
      headers["Authorization"] = `${token.token_type} ${token.access_token}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERROR IN GET REQUEST: ", error);
  }
}

export async function POST(
  url: string,
  data: any,
  token?: ITokenModel
): Promise<any> {
  try {
    const headers: any = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token != null) {
      headers["Authorization"] = `${token.token_type} ${token.access_token}`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error("ERROR IN POST REQUEST: ", error);
  }
}

export async function PUT(
  url: string,
  data: any,
  token?: ITokenModel
): Promise<any> {
  try {
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (token != null) {
      headers["Authorization"] = `${token.token_type} ${token.access_token}`;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`PUT request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("ERROR IN PUT REQUEST: ", error);
  }
}
