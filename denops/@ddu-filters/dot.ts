import {
  BaseFilter,
  DduItem,
} from "https://deno.land/x/ddu_vim@v2.2.0/types.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.3.2/file.ts";
import { Item } from "https://deno.land/x/ddu_vim@v2.0.0/types.ts";
import { FilterArguments } from "https://deno.land/x/ddu_vim@v2.0.0/base/filter.ts";
import { basename } from "https://deno.land/std@0.171.0/path/mod.ts";

type Params = Record<string, unknown>;

type FileSourceItem = DduItem & Item<ActionData>;

const isFileSource = (item: DduItem): item is FileSourceItem => {
  return item.__sourceName === "file";
};

export class Filter extends BaseFilter<Params> {
  override filter(args: FilterArguments<Params>): Promise<DduItem[]> {
    const items: DduItem[] = [];

    args.items.filter(isFileSource).forEach((item) => {
      return !basename(item.action?.path ?? "").startsWith(".");
    });

    return Promise.resolve(items);
  }

  override params(): Params {
    return {};
  }
}
