const idList = [11, 12, 13, 14, 15, 16, 17];

export const GET = async ({ params }) => {
    const { id } = await params;
    
    if (!idList.includes(Number(id))) {
        return Response.json({ status: 404, message: "Dish not found" });
    }

    return Response.json({ status: 200, message: "success" });
}