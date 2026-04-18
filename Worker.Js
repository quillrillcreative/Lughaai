// LughaAI — Cloudflare Worker Proxy
// This file keeps your Anthropic API key secret and safe.
// Deploy this on Cloudflare Workers, then update your index.html to call this worker.

export default {
  async fetch(request, env) {

    // Allow requests from your website only (CORS protection)
    const allowedOrigins = [
      'https://lughaai.netlify.app',   // Replace with your actual Netlify URL
      'http://localhost',               // For local testing
      'http://127.0.0.1',
    ];

    const origin = request.headers.get('Origin') || '';
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    // Handle preflight (browser safety check before sending real request)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': isAllowed ? origin : '',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        }
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Only allow requests from your website
    if (!isAllowed) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      // Read the request body sent from your website
      const body = await request.json();

      // Basic safety: limit messages to avoid abuse
      if (body.messages && body.messages.length > 50) {
        return new Response(JSON.stringify({ error: { message: 'Too many messages in one session.' } }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Forward the request to Anthropic using YOUR secret key (stored safely in env)
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,       // Secret key — never visible to users
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: body.model || 'claude-sonnet-4-20250514',
          max_tokens: body.max_tokens || 1000,
          system: body.system || '',
          messages: body.messages || [],
        })
      });

      const data = await response.json();

      // Send Anthropic's response back to your website
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: { message: 'Worker error: ' + err.message } }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
        }
      });
    }
  }
};
