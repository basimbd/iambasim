export async function post({ request }) {
    const form = await request.formData();
    // integrate with email API or webhook later
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
