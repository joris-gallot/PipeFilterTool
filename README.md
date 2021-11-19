# PipeFilterTool

# Introdcution

Ce framework permet l'éxecution de plusieurs opérations par le biais de filtre qui execute chacun une opération. L'utilisateur peut créer ses propres filtres et chacun des filtres est dépendant du précédent. Il permet donc d'automatiser plusieurs fonction à la chaine.

# Getting started

Il faut commencer par faire la commande :

- npm install

Ensuite pour créer un nouveau projet, il faut utiliser la commande :

- new `<project-name>`

# API

## Les filtres (filters)

Vous pouvez créer vos propres filtres en les créant dans le repertoire `/filters`. Ils permettent d'effectuer des tâches précises. Les filtres peuvent se transmettrent leur entrées/sorties en configurant le fichier de configuration.

## La configuration des filtres

Le fichier de configuration se nomme `config-filters.json`. Il contient les différentes étapes d'exécution des filtres.

Exemple de fichier de configuration :

```json
{
  "steps": {
    "1": {
      "filter": "read",
      "params": ["/.../foo.txt"],
      "next": "2"
    },
    "2": {
      "filter": "capitalize"
    }
  }
}
```

## Les étapes (steps)

Une étape contient :

- un `id` qui l'identifie et qui peut être utilisé pour spécifier le prochain filtre.
- un `filter` qui est le nom du filtre à exécuter.
- une liste de `params` qui contient les paramètres à passer au filtre.
- un champ optionnel `next` qui renseigne le prochain filtre à executer en lui passant en entrée, la valeur de sortie du filtre précédement exécuter.

# Errors

| Code   | Description                                                    |
| ------ | -------------------------------------------------------------- |
| 345678 | Fichier `filter` non valide                                    |
| 345765 | Le fichier de config doit contenir des steps                   |
| 345745 | L'attribut `next` doit faire référence a un step               |
| 345905 | L'attribut `params` doit être de type `array`                  |
| 230005 | Le step `stepKey` doit contenir un attribut `filter`           |
| 235905 | Le filter `filter` doit être présent dans le dossier `filters` |
| 54678  | Step `stepId` déjà présent                                     |
| 54677  | Step `stepId` inexistant                                       |
| 54698  | Impossible de supprimer le `Filter`, utilisé dans la config    |
| 54644  | `Filter` déjà exsistant                                        |

# Tools

Pour la création d'un nouveau filtre :

- add_filter `<filter>`

Pour la suppression d'un filtre :

- del_filter `<filter>`

Pour l'ajout d'une étape dans le fichier de configuration :

- add_step `<step-id>` `<filter-name>` `[next-id]`

Pour la suppression d'une étape dans le fichier de configuration :

- del_step `<step-id>`
