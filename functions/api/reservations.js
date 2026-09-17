export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { name, phone, date, time, guests, message } = body;

    if (!name || !phone || !date || !time) {
      return new Response(JSON.stringify({ error: 'Name, phone, date, and time are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const reservation = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests: parseInt(guests, 10) || 1,
      message: message ? message.trim() : '',
      createdAt: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      message: 'Table reservation received successfully.',
      reservation
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
