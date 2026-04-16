/**
 * GET /api/users
 * Query params:
 *   page     {number}  – current page, 1-based (default: 1)
 *   pageSize {number}  – rows per page   (default: 5)
 *   search   {string}  – filter by name / email / city
 *   sortBy   {string}  – column to sort  (default: "id")
 *   order    {string}  – "ASC" | "DESC"  (default: "ASC")
 */
app.get("/api/users", async (req, res) => {

    try {
        const page     = Math.max(1, parseInt(req.query.page)     || 1);
        const pageSize = Math.max(1, parseInt(req.query.pageSize) || 5);
        const search   = (req.query.search || "").trim();
        const sortBy   = ["id","first_name","last_name","email","city","state"].includes(req.query.sortBy)
                        ? req.query.sortBy : "id";
        const order    = req.query.order === "DESC" ? "DESC" : "ASC";

        const where = search
        ? {
            [Op.or]: [
                { first_name: { [Op.like]: `%${search}%` } },
                { last_name:  { [Op.like]: `%${search}%` } },
                { email:      { [Op.like]: `%${search}%` } },
                { city:       { [Op.like]: `%${search}%` } },
            ],
            }
        : {};

        const { count, rows } = await User.findAndCountAll({
        where,
        order:  [[sortBy, order]],
        limit:  pageSize,
        offset: (page - 1) * pageSize,
        });

        res.json({
        data:       rows,
        total:      count,
        page,
        pageSize,
        totalPages: Math.ceil(count / pageSize),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

/** GET /api/users/:id */
app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

/** POST /api/users */
app.post("/api/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/** PUT /api/users/:id */
app.put("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body);
    res.json(user);
});

/** DELETE /api/users/:id */
app.delete("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.status(204).send();
});
