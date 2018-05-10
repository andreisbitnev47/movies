/**
 * @flow
 * @relayHash 633c70b420ab72c8059b651829c924f8
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EditMovieMutationVariables = {|
  input: {
    globalId: string,
    title?: ?string,
    description?: ?string,
    clientMutationId?: ?string,
  },
|};
export type EditMovieMutationResponse = {|
  +editMovie: ?{|
    +movie: ?{|
      +id: string,
      +title: ?string,
      +description: ?string,
    |},
  |},
|};
*/


/*
mutation EditMovieMutation(
  $input: EditMovieInput!
) {
  editMovie(input: $input) {
    movie {
      id
      title
      description
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "EditMovieInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "editMovie",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "EditMovieInput!"
      }
    ],
    "concreteType": "EditMoviePayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "movie",
        "storageKey": null,
        "args": null,
        "concreteType": "Movie",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "EditMovieMutation",
  "id": null,
  "text": "mutation EditMovieMutation(\n  $input: EditMovieInput!\n) {\n  editMovie(input: $input) {\n    movie {\n      id\n      title\n      description\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditMovieMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "EditMovieMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node/*: any*/).hash = 'b43383179550ad7cfe00c8f052e51c59';
module.exports = node;
