import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request, { params }) {
  try {
    const postId = parseInt(await params.id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }
    const { rows } = await pool.query(
      "SELECT * FROM posts WHERE id = $1 ORDER BY created_at DESC",
      [postId]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  console.log(req);
  try {
    const postId = parseInt(params.id);
    const { title, content } = await req.json();

    // Validate input
    if (isNaN(postId)) {
      return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
    }
    if (!title && !content) {
      return NextResponse.json(
        { message: "At least one field (title or content) required" },
        { status: 400 }
      );
    }

    // Build dynamic query for only provided fields
    const fields = [];
    const values = [];
    let idx = 1;

    if (title) {
      fields.push(`title = $${idx++}`);
      values.push(title);
    }
    if (content) {
      fields.push(`content = $${idx++}`);
      values.push(content);
    }
    values.push(postId);

    const query = `
            UPDATE posts
            SET ${fields.join(", ")}
            WHERE id = $${idx}
            RETURNING *
        `;

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: rows[0],
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { message: "Error updating blog", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { message: "Invalid post ID" },
        { status: 400 }
      );
    }

    const { rowCount } = await pool.query(
      "DELETE FROM posts WHERE id = $1",
      [postId]
    );

    if (rowCount === 0) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Error deleting blog", error: error.message },
      { status: 500 }
    );
  }
}
