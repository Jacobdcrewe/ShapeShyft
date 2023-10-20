export async function GET(url: string, token: string): Promise<any> {
  try {
    const headers: any = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
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
  token?: string
): Promise<any> {
  try {
    const headers: any = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
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
  token?: string
): Promise<any> {
  try {
    const headers: any = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
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
