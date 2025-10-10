import dayjs from 'dayjs';
import { modCategories } from '../../../shared/modCategories';
import { cfg } from '../../src/cfg';
import { RaftVersion } from '../../src/entities/RaftVersion';
import { capitalize } from '../../src/utils';

export const slug = {
  schema: {
    pattern: '^[a-z0-9]+(?:[-\\._][a-z0-9]+)*$',
    maxLength: 64,
    errorMessage: {
      pattern:
        'Should be a <a href="https://api.raftmodding.com/website/slugs" target="_blank">slug</a>',
    },
  },
};

export const httpS = {
  schema: {
    pattern: '^https?://',
    errorMessage: {
      pattern: 'Should be a link starting with http/s',
    },
  },
};

export const mail = {
  schema: {
    format: 'email', // https://json-schema.org/understanding-json-schema/reference/type#email-addresses
    errorMessage: {
      pattern: 'Should be an e-mail',
    },
  },
};

export const username = {
  schema: {
    minLength: 3,
  },
};

export const password = {
  schema: {
    minLength: 8,
    errorMessage: {
      pattern: `Must contain a number, uppercase letter and special character`,
    },
  },
  uischema: {
    options: {
      password: true,
    },
  },
};

export const disableRule = {
  rule: {
    effect: 'DISABLE',
    condition: {
      const: true,
    },
  },
};

export const markdownEditor = {
  uischema: {
    options: {
      multi: true,
      markdown: true,
    },
  },
};

export const integerMax = {
  maximum: 2147483647,
  errorMessage: {
    maximum: '<u>Must</u> not exceed integer range! (<= 2147483647)',
  },
};

export const fileUploadAccept = {
  accept: cfg.fileUploadAccept.join(', '),
};

export const recaptcha = {
  uischema: {
    options: {
      recaptcha: true,
      siteKey: cfg.reCaptcha?.siteKey || '',
    },
  },
};

export const getRaftVersionsSchema = async (extendedTitle: boolean = false) => {
  const raftVersions = await RaftVersion.find({
    select: ['id', 'title', 'releasedAt'],
    order: { releasedAt: 'desc' },
  });

  return {
    oneOf: [
      ...raftVersions.map((version) => {
        let title = `Raft Update: ${version.title}`;

        if (extendedTitle) {
          title += ` (${dayjs(version.releasedAt).format('YYYY-MM-DD')})`;
        }

        return {
          const: version.id,
          title,
        };
      }),
    ],
  };
};

export const minMaxRaftVersion = {
  async getSchema() {
    const raftVersionsSchema = await getRaftVersionsSchema();

    return {
      minRaftVersionId: {
        ...raftVersionsSchema,
        title: 'Min. raft version',
      },
      maxRaftVersionId: {
        ...raftVersionsSchema,
        title: 'Max. raft version',
      },
      definiteMaxRaftVersion: {
        type: 'boolean',
        title: 'Definite version cap?',
      },
    };
  },
  uischema: [
    {
      type: 'CustomRangeSelection',
      label: 'Compatible Raft versions',
      elements: [
        { type: 'Control', scope: '#/properties/minRaftVersionId' },
        { type: 'Control', scope: '#/properties/maxRaftVersionId' },
      ],
    },
    { type: 'Control', scope: '#/properties/definiteMaxRaftVersion' },
  ],
};

export const modCategoriesSchema = {
  type: 'string',
  oneOf: [
    ...modCategories.map((category) => ({
      title: capitalize(category),
      const: category,
    })),
  ],
};
