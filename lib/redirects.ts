// MIT License (c) 2023 Jim Mendenhall

export function needRewrite(
  urlString: string,
  redirectRules: Array<{ fromPath: string; toPath: string }>
): string | boolean {
  const url = new URL(urlString); 
  const rule = redirectRules.find((rule) => rule.fromPath === url.pathname);

  return rule ? rule.toPath : false;
}

export async function parseRedirectRules(
  filePath: string
): Promise<Array<{ fromPath: string; toPath: string }>> {
  const fileContent = await Deno.readTextFile(filePath);
  const redirectRules = [];

  for (const line of fileContent.trim().split("\n")) {
    const [fromPath, toPath] = line.trim().split(/\s+/);
    redirectRules.push({ fromPath, toPath });
  }

  return redirectRules;
}
