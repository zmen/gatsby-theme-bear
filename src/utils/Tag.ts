export class Tag {
  public children: Tag[] = [];
  constructor(public tagname:string, public to?:string) {}
}

export function flat (ary: Array<Array<string> | string>): string[] {
  const result = [];
  for (const item of ary) {
    if (Array.isArray(item)) {
      for (const innerItem of flat(item)) {
        result.push(innerItem);
      }
    } else {
      result.push(item);
    }
  }
  return result;
}

export function buildTags (tags: Array<Array<string>>): Array<Tag> {
  const flatTags = flat(tags);
  const topLevel = [];
  const tagMap = new Map();
  for (const tagPath of flatTags) {
    const tags = tagPath.split('/');
    tags.forEach((tag, i, self) => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, new Tag(tag));
      }
      if (i === 0) {
        if (!topLevel.includes(tag)) topLevel.push(tag);
      } else {
        const prevTag = tagMap.get(self[i - 1]);
        const currentTag = tagMap.get(tag);
        if (!prevTag.children.includes(currentTag)) {
          prevTag.children.push(currentTag);
        }
      }
    });
  }

  return topLevel.map(tagname => tagMap.get(tagname));
}

export function isTagInclude (blogTag: string[], tag: string): boolean {
  if (!blogTag) return false;
  if (!tag) return true;
  return blogTag.some(tagList => tagList.split('/').includes(tag));
}

export function tagIconMap (tagname) {
  if (['HOME', '首页'].includes(tagname)) return 'home';
  if (['SETTING', '设置'].includes(tagname)) return 'cog';
  if (['ABOUT', '关于'].includes(tagname)) return 'user';
  return 'tag';
}