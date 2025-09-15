// src/index.ts
import app from '../app';


const PORT = Number(process.env.PORT) || 3008;

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
