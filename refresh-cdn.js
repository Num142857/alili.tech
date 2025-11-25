// Refresh CDN cache after COS upload
// Uses Tencent Cloud CDN SDK (not COS SDK)
// Requires: npm install tencentcloud-sdk-nodejs
// CDN SDK docs: https://cloud.tencent.com/document/product/228/37870
const tencentcloud = require("tencentcloud-sdk-nodejs");

// Import CDN client (not COS client)
const CdnClient = tencentcloud.cdn.v20180606.Client;

const clientConfig = {
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY,
  },
  region: "ap-shanghai", // CDN API region
};

const client = new CdnClient(clientConfig);

const domain = process.env.CDN_DOMAIN || "alili.tech";

async function refreshCache() {
  try {
    console.log(`Refreshing CDN cache for domain: ${domain}`);
    console.log(`Using SecretId: ${process.env.TENCENT_SECRET_ID ? 'Set' : 'Not set'}`);
    
    // Method 1: Purge URLs Cache (for specific URLs)
    // Reference: https://cloud.tencent.com/document/product/228/37870
    console.log("Method 1: Purging URLs cache...");
    const urlParams = {
      Urls: [
        `https://${domain}/`,
        `https://${domain}/index.html`,
        `https://${domain}/*`,
      ],
    };

    const urlResponse = await client.PurgeUrlsCache(urlParams);
    console.log("URL cache purge response:", JSON.stringify(urlResponse, null, 2));
    
    // Method 2: Purge Paths Cache (for directory refresh, more efficient)
    // This refreshes entire directories
    console.log("Method 2: Purging paths cache...");
    const pathParams = {
      Paths: [
        `https://${domain}/`,
      ],
      FlushType: "delete", // delete: refresh, flush: preload
    };

    const pathResponse = await client.PurgePathCache(pathParams);
    console.log("Path cache purge response:", JSON.stringify(pathResponse, null, 2));
    
    console.log("CDN cache refresh initiated successfully");
    console.log("Note: Cache refresh may take 5-10 minutes to take effect");
  } catch (error) {
    console.error("Error refreshing CDN cache:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error:", JSON.stringify(error, null, 2));
    
    // Check if it's a CDN not configured error
    if (error.code === 'InvalidParameter' || error.message?.includes('domain')) {
      console.warn("Warning: CDN may not be configured for this domain, or domain not found in CDN");
      console.warn("If you're using COS static website hosting without CDN, cache refresh is not needed");
    }
    
    // Don't fail the deployment if cache refresh fails
    process.exit(0);
  }
}

refreshCache();

